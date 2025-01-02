import { supabase } from "@/integrations/supabase/client";

interface PiPayment {
  identifier: string;
  user_uid: string;
  amount: number;
  memo: string;
  metadata: object;
  status: {
    developer_approved: boolean;
    transaction_verified: boolean;
    developer_completed: boolean;
    cancelled: boolean;
    user_cancelled: boolean;
  };
  created_at: string;
}

interface PiUser {
  uid: string;
  username: string;
  accessToken: string;
  payments?: PiPayment[];
}

interface PiSDK {
  init: (config: { version: string; sandbox: boolean }) => void;
  authenticate: (
    scopes?: string[],
    onIncompletePaymentFound?: (payment: PiPayment) => void
  ) => Promise<PiUser>;
  createPayment: (data: {
    amount: number;
    memo: string;
    metadata?: object;
  }) => Promise<PiPayment>;
  openPaymentDialog: (paymentId: string) => Promise<void>;
  getWalletAddress: () => Promise<string>;
}

declare global {
  interface Window {
    Pi?: PiSDK;
  }
}

class PiNetworkClient {
  private static instance: PiNetworkClient;
  private currentUser: PiUser | null = null;

  private constructor() {}

  static getInstance(): PiNetworkClient {
    if (!PiNetworkClient.instance) {
      PiNetworkClient.instance = new PiNetworkClient();
    }
    return PiNetworkClient.instance;
  }

  async init() {
    if (!window.Pi) {
      throw new Error("Pi Network SDK not loaded");
    }
    window.Pi.init({ version: "2.0", sandbox: true }); // Set sandbox to false in production
  }

  async authenticate(): Promise<PiUser> {
    if (!window.Pi) {
      throw new Error("Pi Network SDK not loaded");
    }

    try {
      const scopes = ["username", "payments", "wallet_address"];
      const handleIncompletePayment = (payment: PiPayment) => {
        console.log("Incomplete payment found:", payment);
      };

      const user = await window.Pi.authenticate(scopes, handleIncompletePayment);
      this.currentUser = user;

      // Store user data in Supabase
      const { data: profile, error } = await supabase
        .from('profiles')
        .upsert({
          user_id: user.uid,
          username: user.username,
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) {
        console.error("Error updating profile:", error);
        throw error;
      }

      return user;
    } catch (error) {
      console.error("Pi Network authentication error:", error);
      throw error;
    }
  }

  getCurrentUser(): PiUser | null {
    return this.currentUser;
  }
}

export const piNetwork = PiNetworkClient.getInstance();