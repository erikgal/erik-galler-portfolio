/**
 * Split array and swap values
 *
 * @param {Array<number>} array
 * @param {number} [left=0]
 * @param {number} [right=array.length - 1]
 * @returns {number}
 */

import { ComplexNumber } from './discreteFourierTransform';

function partition(array: Array<ComplexNumber>, left = 0, right: number = array.length - 1) {
    const pivot = array[Math.floor((right + left) / 2)].amplitude;
    let i = left;
    let j = right;

    while (i <= j) {
        while (array[i].amplitude > pivot) {
            i++;
        }

        while (array[j].amplitude < pivot) {
            j--;
        }

        if (i <= j) {
            [array[i], array[j]] = [array[j], array[i]];
            i++;
            j--;
        }
    }

    return i;
}

/**
 * Quicksort implementation
 *
 * @param {Array<number>} array
 * @param {number} [left=0]
 * @param {number} [right=array.length - 1]
 * @returns {Array<number>}
 */
export function quickSort(array: Array<ComplexNumber>, left = 0, right: number = array.length - 1) {
    let index;

    if (array.length > 1) {
        index = partition(array, left, right);

        if (left < index - 1) {
            quickSort(array, left, index - 1);
        }

        if (index < right) {
            quickSort(array, index, right);
        }
    }

    return array;
}
