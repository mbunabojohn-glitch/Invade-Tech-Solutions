declare module '@paystack/inline-js' {
  interface PaystackOptions {
    key: string;
    email: string;
    amount: number;
    currency?: string;
    ref?: string;
    metadata?: Record<string, unknown>;
    onSuccess?: (transaction: { reference: string }) => void;
    onCancel?: () => void;
  }

  interface PaystackInstance {
    newTransaction(options: PaystackOptions): void;
  }

  export default function PaystackPop(): PaystackInstance;
}
