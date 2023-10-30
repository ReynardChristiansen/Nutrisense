import {
  create
} from 'zustand'

export const BottomSheetStore = create((set) => ({
  isActive: true,
  content: {foodNames:[],nutrients:[]},
  setActive: (active) => set((state) => ({
    isActive: active
  })),
  setContent: (content) => set((state) => ({  
    content: content
  })),
}))

export const cameraModal = create((set) => ({
  isActive: false,
  setActive: (active) => set((state) => ({
    isActive: active
  })),
  content: {},
  setContent: (content) =>
    set((state) => ({
      content: content,
    })),
}))

export const calculatorModal = create((set) => ({
  isActive: false,
  setActive: (active) => set((state) => ({
    isActive: active
  })),
  isLoading: false,
  setLoading: (loading) => set((state) => ({
    isLoading: loading
  })),
  content: '',
  setContent: (content) =>
    set((state) => ({
      content: content,
    })),
}))

export const blogModal = create((set) => ({
  isActive: false,
  setActive: (active) => set((state) => ({
    isActive: active
  })),
  content: {},
  setContent: (content) =>
    set((state) => ({
      content: content,
    })),
}))


export const toggleLoadingScreen = create((set) => ({
  isLoading: false,
  setLoading: (loading) => set((state) => ({
    isLoading: loading
  })),
}))