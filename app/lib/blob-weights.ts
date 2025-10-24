/**
 * Universal blob weight constants and utilities for DynamicGradientBlob
 * 
 * Usage:
 * 1. Import the constant: import { BLOB_WEIGHT } from '@/lib/blob-weights'
 * 2. Add to any component: <div data-blob-weight={BLOB_WEIGHT.HIGH}>Content</div>
 * 3. Or use the utility: <div {...getBlobWeightProps(BLOB_WEIGHT.MEDIUM)}>Content</div>
 */

export const BLOB_WEIGHT = {
  /** Very low visual weight - barely attracts the blob */
  VERY_LOW: 0.1,
  /** Low visual weight - minimal attraction */
  LOW: 0.3,
  /** Normal visual weight - standard attraction */
  NORMAL: 1,
  /** Medium visual weight - moderate attraction */
  MEDIUM: 1.5,
  /** High visual weight - strong attraction */
  HIGH: 2.5,
  /** Very high visual weight - maximum attraction */
  VERY_HIGH: 4,
  /** Disable blob attraction completely */
  DISABLED: 0,
} as const;

export type BlobWeight = typeof BLOB_WEIGHT[keyof typeof BLOB_WEIGHT];

/**
 * Utility function to generate props for blob weight
 * @param weight - The blob weight value
 * @returns Object with data-blob-weight attribute
 */
export function getBlobWeightProps(weight: BlobWeight) {
  return {
    'data-blob-weight': weight.toString(),
  };
}

/**
 * Utility function to conditionally apply blob weight
 * @param weight - The blob weight value
 * @param condition - Whether to apply the weight
 * @returns Object with data-blob-weight attribute or empty object
 */
export function getConditionalBlobWeightProps(weight: BlobWeight, condition: boolean) {
  return condition ? getBlobWeightProps(weight) : {};
}

/**
 * CSS class names for common blob weight presets
 * These can be used with Tailwind's arbitrary value syntax
 */
export const BLOB_WEIGHT_CLASSES = {
  VERY_LOW: '[&[data-blob-weight="0.1"]]',
  LOW: '[&[data-blob-weight="0.3"]]',
  NORMAL: '[&[data-blob-weight="1"]]',
  MEDIUM: '[&[data-blob-weight="1.5"]]',
  HIGH: '[&[data-blob-weight="2.5"]]',
  VERY_HIGH: '[&[data-blob-weight="4"]]',
  DISABLED: '[&[data-blob-weight="0"]]',
} as const;
