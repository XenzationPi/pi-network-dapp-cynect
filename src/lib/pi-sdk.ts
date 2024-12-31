// Define Pi SDK types
declare global {
  interface Window {
    Pi: {
      authenticate: (
        scopes: string[],
        onIncompletePaymentFound: (payment: any) => void
      ) => Promise<{
        uid: string;
        username: string;
        accessToken: string;
      }>;
    };
  }
}

interface PiUser {
  uid: string;
  username: string;
  accessToken: string;
}

class PiNetwork {
  private static instance: PiNetwork;
  private user: PiUser | null = null;

  private constructor() {}

  static getInstance(): PiNetwork {
    if (!PiNetwork.instance) {
      PiNetwork.instance = new PiNetwork();
    }
    return PiNetwork.instance;
  }

  async authenticate(): Promise<PiUser> {
    try {
      const scopes = ['username', 'payments', 'wallet_address'];
      const auth = await window.Pi.authenticate(scopes, onIncompletePaymentFound);
      this.user = auth;
      return auth;
    } catch (error) {
      console.error('Pi Authentication Error:', error);
      throw error;
    }
  }

  async getBalance(): Promise<number> {
    try {
      // Mock balance for now - will be replaced with actual Pi SDK call
      return 100;
    } catch (error) {
      console.error('Get Balance Error:', error);
      throw error;
    }
  }
}

function onIncompletePaymentFound(payment: any) {
  console.log('Incomplete payment found:', payment);
}

export const piNetwork = PiNetwork.getInstance();