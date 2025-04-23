import { renderHook } from '@testing-library/react-hooks'

import { useStoreUpdate } from './index'

import { useStorageString } from '~/services/storage'

// Mock the storage hook
jest.mock('~/services/storage', () => ({
  useStorageString: jest.fn(),
  StorageKeys: {
    RecommendedUpdate: 'recommendedUpdate',
  },
}))

// Mock Platform.select
jest.mock('react-native', () => ({
  Platform: {
    select: jest.fn(({ ios }) => ios), // Simplified to always return iOS version
    OS: 'ios',
  },
}))

// Mock package.json
jest.mock('package.json', () => ({
  version: '1.0.0',
}))

const mockData = {
  recommendedIOSVersion: '1.0.0',
  recommendedAndroidVersion: '1.1.0',
  minIOSVersion: '0.9.0',
  minAndroidVersion: '0.9.5',
}

describe('useStoreUpdate', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // Default mock implementation
    ;(useStorageString as jest.Mock).mockReturnValue([null])
  })

  it('should handle loading state', () => {
    const { result } = renderHook(() => useStoreUpdate({ loading: true }))
    expect(result.current.loading).toBe(true)
  })

  it('should return correct platform-specific versions', () => {
    const { result } = renderHook(() => useStoreUpdate({ data: mockData }))

    expect(result.current.recommendedVersion).toBe(mockData.recommendedIOSVersion)
    expect(result.current.forceUpdateVersion).toBe(mockData.minIOSVersion)
  })

  it('should not force update when version is supported', () => {
    const { result } = renderHook(() => useStoreUpdate({ data: mockData }))
    expect(result.current.shouldForceUpdate).toBe(false)
  })

  it('should force update when version is not supported', () => {
    const forceUpdateData = {
      ...mockData,
      minIOSVersion: '2.0.0', // Higher than current version
    }

    const { result } = renderHook(() => useStoreUpdate({ data: forceUpdateData }))
    expect(result.current.shouldForceUpdate).toBe(true)
  })

  it('should not recommend update when force update is required', () => {
    const forceUpdateData = {
      ...mockData,
      minIOSVersion: '2.0.0', // Higher than current version
    }

    const { result } = renderHook(() => useStoreUpdate({ data: forceUpdateData }))
    expect(result.current.shouldRecommendUpdate).toBe(false)
  })

  it('should recommend update when version is not supported and not forced', () => {
    const recommendUpdateData = {
      ...mockData,
      recommendedIOSVersion: '2.0.0', // Higher than current version
    }

    const { result } = renderHook(() => useStoreUpdate({ data: recommendUpdateData }))
    expect(result.current.shouldRecommendUpdate).toBe(true)
  })

  it('should not recommend update when recommended version matches stored version', () => {
    ;(useStorageString as jest.Mock).mockReturnValue(['1.0.0'])
    const { result } = renderHook(() => useStoreUpdate({ data: mockData }))
    expect(result.current.shouldRecommendUpdate).toBe(false)
  })
})
