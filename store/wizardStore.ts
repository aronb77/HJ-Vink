import { create } from 'zustand';

export type ServiceType =
    | 'glad_stucwerk'
    | 'behangklaar'
    | 'dunpleister'
    | 'raapwerk'
    | 'spackspuiten'
    | 'latex_spuiten'
    | 'betonlook'
    | 'renovlies'
    | 'schilderwerk'
    | null;
export type ProjectType = 'nieuwbouw' | 'renovatie';

interface ContactDetails {
    naam: string;
    email: string;
    telefoon: string;
    opmerking: string;
}

interface WizardState {
    isOpen: boolean;
    isDocked: boolean;
    isFooterCtaVisible: boolean;
    step: number;
    selection: {
        service: ServiceType;
        type: ProjectType;
        area: number;
        contact: ContactDetails;
    };
    openWizard: () => void;
    closeWizard: () => void;
    setDocked: (docked: boolean) => void;
    setFooterCtaVisible: (visible: boolean) => void;
    setStep: (step: number) => void;
    setService: (service: ServiceType) => void;
    setType: (type: ProjectType) => void;
    setArea: (area: number) => void;
    setContact: (contact: Partial<ContactDetails>) => void;
    resetWizard: () => void;
}

const useWizardStore = create<WizardState>((set) => ({
    isOpen: false,
    isDocked: false,
    isFooterCtaVisible: false,
    step: 1,
    selection: {
        service: null,
        type: 'nieuwbouw',
        area: 50,
        contact: {
            naam: '',
            email: '',
            telefoon: '',
            opmerking: '',
        },
    },
    openWizard: () => set({ isOpen: true }),
    closeWizard: () => set({ isOpen: false }),
    setDocked: (docked) => set({ isDocked: docked }),
    setFooterCtaVisible: (visible) => set({ isFooterCtaVisible: visible }),
    setStep: (step) => set({ step }),
    setService: (service) => set((state) => ({
        selection: { ...state.selection, service }
    })),
    setType: (type) => set((state) => ({
        selection: { ...state.selection, type }
    })),
    setArea: (area) => set((state) => ({
        selection: { ...state.selection, area }
    })),
    setContact: (contact) => set((state) => ({
        selection: { ...state.selection, contact: { ...state.selection.contact, ...contact } }
    })),
    resetWizard: () => set({
        step: 1,
        selection: {
            service: null,
            type: 'nieuwbouw',
            area: 50,
            contact: { naam: '', email: '', telefoon: '', opmerking: '' }
        }
    })
}));

export default useWizardStore;
