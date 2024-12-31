// Define Pi SDK types
interface PiPayment {
  // Add payment types as needed
  id: string;
  amount: number;
  status: string;
}

interface PiUser {
  uid: string;
  username: string;
  accessToken: string;
}

interface PiSDK {
  init: (config: { version: string; sandbox: boolean }) => void;
  authenticate: (
    scopes: string[],
    onIncompletePaymentFound: (payment: PiPayment) => void
  ) => Promise<PiUser>;
}

declare global {
  interface Window {
    Pi?: PiSDK;
  }
}

const handleIncompletePayment = (payment: PiPayment) => {
  console.log("Incomplete payment found:", payment);
  // Handle incomplete payment logic here
};

class PiNetworkClient {
  private static instance: PiNetworkClient;

  private constructor() {}

  static getInstance(): PiNetworkClient {
    if (!PiNetworkClient.instance) {
      PiNetworkClient.instance = new PiNetworkClient();
    }
    return PiNetworkClient.instance;
  }

  async authenticate(): Promise<PiUser> {
    if (!window.Pi) {
      throw new Error("Pi Network SDK not loaded");
    }

    const scopes = ["username", "payments", "wallet_address"];
    return window.Pi.authenticate(scopes, handleIncompletePayment);
  }

  async getBalance(): Promise<number> {
    // Mock balance for development
    return 100;
  }
}

export const piNetwork = PiNetworkClient.getInstance();