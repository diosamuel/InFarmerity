import { create } from 'zustand';

const useStore = create((set) => ({
    wallet: {}, // Dictionary for wallet data
    setWallet: (walletData) =>
        set((state) => ({ wallet: { ...state.wallet, ...walletData } })),

    insuranceStatus: {}, // Dictionary for insurance status
    setInsuranceStatus: (statusData) =>
        set((state) => ({ insuranceStatus: { ...state.insuranceStatus, ...statusData } })),

    form: {}, // Dictionary for form data
    setForm: (formData) =>
        set((state) => ({ form: { ...state.form, ...formData } })),

    resetWallet: () => set({ wallet: {} }), // Reset wallet dictionary
    resetInsuranceStatus: () => set({ insuranceStatus: {} }), // Reset insuranceStatus dictionary
    resetForm: () => set({ form: {} }), // Reset form dictionary
}));

export default useStore;
