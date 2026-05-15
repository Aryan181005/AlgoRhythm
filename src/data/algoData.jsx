export const algoData = {
  // Merge Sort
  merge: {
    title: "Merge Sort",
    info: {
      intro: (
        <>
          MergeSort is a <span className="text-teal-500">divide & conquer</span>{" "}
          algorithm that divides the array and then merges the sorted halves.
        </>
      ),
      steps: [
        "Divide the array into two halves",
        "Recursively sort both halves",
        "Merge the sorted halves",
      ],
      complexity: {
        best: "O(n log n)",
        average: "O(n log n)",
        worst: "O(n log n)",
      },
      footer: "Stable Algorithm with predictable performance",
    },
    code: {
      python: `
      def merge_sort(arr):
        if len(arr) <= 1:
            return arr

        mid = len(arr) // 2
        left = merge_sort(arr[:mid])
        right = merge_sort(arr[mid:])

        return merge(left, right)

      def merge(left, right):
        result = []
        i = j = 0

        while i < len(left) and j < len(right):
            if left[i] < right[j]:
                result.append(left[i])
                i += 1
            else:
                result.append(right[j])
                j += 1

        result.extend(left[i:])
        result.extend(right[j:])
        return result
      `,
      java:`
      class MergeSort {
        static void merge(int arr[], int l, int m, int r) {
            int n1 = m - l + 1;
            int n2 = r - m;

            int L[] = new int[n1];
            int R[] = new int[n2];

            for (int i = 0; i < n1; i++)
                L[i] = arr[l + i];

            for (int j = 0; j < n2; j++)
                R[j] = arr[m + 1 + j];

            int i = 0, j = 0, k = l;

            while (i < n1 && j < n2) {
                if (L[i] <= R[j]) {
                    arr[k] = L[i];
                    i++;
                } else {
                    arr[k] = R[j];
                    j++;
                }
                k++;
            }

            while (i < n1) {
                arr[k] = L[i];
                i++;
                k++;
            }

            while (j < n2) {
                arr[k] = R[j];
                j++;
                k++;
            }
        }

        static void mergeSort(int arr[], int l, int r) {
            if (l < r) {
                int m = (l + r) / 2;

                mergeSort(arr, l, m);
                mergeSort(arr, m + 1, r);

                merge(arr, l, m, r);
            }
        }

        public static void main(String args[]) {
            int arr[] = {12, 11, 13, 5, 6, 7};

            mergeSort(arr, 0, arr.length - 1);

            for (int x : arr)
                System.out.print(x + " ");
        }
      }
      `,
      cplus:`
      #include <iostream>
      using namespace std;

      void merge(int arr[], int l, int m, int r) {
          int n1 = m - l + 1;
          int n2 = r - m;

          int L[n1], R[n2];

          for (int i = 0; i < n1; i++)
              L[i] = arr[l + i];
          for (int j = 0; j < n2; j++)
              R[j] = arr[m + 1 + j];

          int i = 0, j = 0, k = l;

          while (i < n1 && j < n2) {
              if (L[i] <= R[j]) {
                  arr[k] = L[i];
                  i++;
              } else {
                  arr[k] = R[j];
                  j++;
              }
              k++;
          }

          while (i < n1) {
              arr[k] = L[i];
              i++; k++;
          }

          while (j < n2) {
              arr[k] = R[j];
              j++; k++;
          }
      }

      void mergeSort(int arr[], int l, int r) {
          if (l < r) {
              int m = l + (r - l) / 2;

              mergeSort(arr, l, m);
              mergeSort(arr, m + 1, r);

              merge(arr, l, m, r);
          }
      }

      int main() {
          int arr[] = {12, 11, 13, 5, 6, 7};
          int n = sizeof(arr) / sizeof(arr[0]);

          mergeSort(arr, 0, n - 1);

          for (int i = 0; i < n; i++)
              cout << arr[i] << " ";

          return 0;
      }
      `
    },
  },

  // Quick Sort
  quick: {
    title: "Quick Sort",
    info: {
      intro: (
        <>
          QuickSort is a <span className="text-teal-500">divide & conquer</span>{" "}
          algorithm. It selects a <span className="text-red-500">pivot</span>{" "}
          and partitions the array around it.
        </>
      ),
      steps: [
        "Choose a pivot element (usually the last)",
        "Compare each element with the pivot",
        "Place the pivot in its correct position",
        "Now array is partitioned into smaller and larger arrays than the pivot",
        "Recursively sort both the sub-arrays",
      ],
      complexity: {
        best: "O(n log n)",
        average: "O(n log n)",
        worst: "O(n²)",
      },
      footer: "Fast in practice and widely used in real systems",
    },
    code: {
      python: `
      def quick_sort(arr):
        if len(arr) <= 1:
          return arr
    
        pivot = arr[len(arr) // 2]
        left = [x for x in arr if x < pivot]
        middle = [x for x in arr if x == pivot]
        right = [x for x in arr if x > pivot]
        
        return quick_sort(left) + middle + quick_sort(right)
      `,
      java:`
      class QuickSort {
        static int partition(int arr[], int low, int high) {
            int pivot = arr[high];
            int i = (low - 1);

            for (int j = low; j < high; j++) {
                if (arr[j] < pivot) {
                    i++;
                    int temp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = temp;
                }
            }

            int temp = arr[i + 1];
            arr[i + 1] = arr[high];
            arr[high] = temp;

            return i + 1;
        }

        static void quickSort(int arr[], int low, int high) {
            if (low < high) {
                int pi = partition(arr, low, high);

                quickSort(arr, low, pi - 1);
                quickSort(arr, pi + 1, high);
            }
        }

        public static void main(String args[]) {
            int arr[] = {10, 7, 8, 9, 1, 5};

            quickSort(arr, 0, arr.length - 1);

            for (int i : arr)
                System.out.print(i + " ");
        }
      }
      `,
      cplus:`
      #include <iostream>
      using namespace std;

      void quickSort(int arr[], int low, int high) {
          if (low < high) {
              int pivot = arr[high];
              int i = low - 1;

              for (int j = low; j < high; j++) {
                  if (arr[j] < pivot) {
                      i++;
                      swap(arr[i], arr[j]);
                  }
              }
              swap(arr[i + 1], arr[high]);
              int pi = i + 1;

              quickSort(arr, low, pi - 1);
              quickSort(arr, pi + 1, high);
          }
      }

      int main() {
          int arr[] = {10, 7, 8, 9, 1, 5};
          int n = sizeof(arr) / sizeof(arr[0]);

          quickSort(arr, 0, n - 1);

          for (int i = 0; i < n; i++)
              cout << arr[i] << " ";
          return 0;
      }
      `
    },
  },

  // Heap Sort
  heap: {
    title: "Heap Sort",
    info: {
      intro: (
        <>
          Heap Sort uses a <span className="text-teal-500">Binary Heap</span> to sort elements efficiently.
        </>
      ),
      steps: [
        "Build a max-heap",
        "Swap root with last element",
        "Heapify reduced heap",
      ],
      complexity: {
        best: "O(n log n)",
        average: "O(n log n)",
        worst: "O(n log n)",
      },
      footer: (
        <>In-place sorting but <span className="text-red-500 font-bold">not stable</span></>
      ),
    },
    code: {
      python: `
    def heapify(arr, n, i):
        largest = i
        left = 2 * i + 1
        right = 2 * i + 2

        if left < n and arr[left] > arr[largest]:
            largest = left

        if right < n and arr[right] > arr[largest]:
            largest = right

        if largest != i:
            arr[i], arr[largest] = arr[largest], arr[i]
            heapify(arr, n, largest)


    def heap_sort(arr):
        n = len(arr)

        # Build max heap
        for i in range(n // 2 - 1, -1, -1):
            heapify(arr, n, i)

        # Extract elements one by one
        for i in range(n - 1, 0, -1):
            arr[i], arr[0] = arr[0], arr[i]
            heapify(arr, i, 0)

        return arr
      `,
      java:`
    class HeapSort {
        void heapify(int arr[], int n, int i) {
            int largest = i;
            int left = 2 * i + 1;
            int right = 2 * i + 2;

            if (left < n && arr[left] > arr[largest])
                largest = left;

            if (right < n && arr[right] > arr[largest])
                largest = right;

            if (largest != i) {
                int temp = arr[i];
                arr[i] = arr[largest];
                arr[largest] = temp;

                heapify(arr, n, largest);
            }
        }

        void heapSort(int arr[]) {
            int n = arr.length;

            // Build max heap
            for (int i = n / 2 - 1; i >= 0; i--)
                heapify(arr, n, i);

            // Extract elements
            for (int i = n - 1; i > 0; i--) {

                int temp = arr[0];
                arr[0] = arr[i];
                arr[i] = temp;

                heapify(arr, i, 0);
            }
        }

        public static void main(String args[]) {
            int arr[] = {12, 11, 13, 5, 6, 7};

            HeapSort obj = new HeapSort();
            obj.heapSort(arr);

            for (int x : arr)
                System.out.print(x + " ");
        }
    }
      `,
      cplus:`
    #include <iostream>
    using namespace std;

    void heapify(int arr[], int n, int i) {
        int largest = i;
        int left = 2 * i + 1;
        int right = 2 * i + 2;

        if (left < n && arr[left] > arr[largest])
            largest = left;

        if (right < n && arr[right] > arr[largest])
            largest = right;

        if (largest != i) {
            swap(arr[i], arr[largest]);
            heapify(arr, n, largest);
        }
    }

    void heapSort(int arr[], int n) {

        // Build max heap
        for (int i = n / 2 - 1; i >= 0; i--)
            heapify(arr, n, i);

        // Extract elements
        for (int i = n - 1; i > 0; i--) {
            swap(arr[0], arr[i]);

            heapify(arr, i, 0);
        }
    }

    int main() {
        int arr[] = {12, 11, 13, 5, 6, 7};
        int n = sizeof(arr) / sizeof(arr[0]);

        heapSort(arr, n);

        for (int i = 0; i < n; i++)
            cout << arr[i] << " ";

        return 0;
    }
      `
    },
  },

  // Bubble Sort
  bubble: {
    title: "Bubble Sort",
    info: {
      intro: (
        <>
          Bubble Sort repeatedly <span className="text-teal-500">swaps adjacent elements</span> if they are in wrong order.
        </>
      ),
      steps: [
        "Compare adjacent elements",
        "Swap if they are in wrong order",
        "Repeat for all elements",
      ],
      complexity: {
        best: "O(n)",
        average: "O(n²)",
        worst: "O(n²)",
      },
      footer: (
        <>Simple but <span className="text-red-500 font-bold">inefficient</span> for large datasets.</>
      ),
    },
    code: {
      python: `
    def bubble_sort(arr):
        n = len(arr)

        for i in range(n):
            swapped = False

            for j in range(0, n - i - 1):

                if arr[j] > arr[j + 1]:
                    arr[j], arr[j + 1] = arr[j + 1], arr[j]
                    swapped = True

            if not swapped:
                break

        return arr
      `,
      java:`
    class BubbleSort {
        static void bubbleSort(int arr[]) {
            int n = arr.length;

            for (int i = 0; i < n - 1; i++) {

                boolean swapped = false;

                for (int j = 0; j < n - i - 1; j++) {

                    if (arr[j] > arr[j + 1]) {

                        int temp = arr[j];
                        arr[j] = arr[j + 1];
                        arr[j + 1] = temp;

                        swapped = true;
                    }
                }

                if (!swapped)
                    break;
            }
        }

        public static void main(String args[]) {

            int arr[] = {64, 34, 25, 12, 22, 11, 90};

            bubbleSort(arr);

            for (int x : arr)
                System.out.print(x + " ");
        }
    }
      `,
      cplus:`
    #include <iostream>
    using namespace std;

    void bubbleSort(int arr[], int n) {

        for (int i = 0; i < n - 1; i++) {
            bool swapped = false;

            for (int j = 0; j < n - i - 1; j++) {

                if (arr[j] > arr[j + 1]) {
                    swap(arr[j], arr[j + 1]);
                    swapped = true;
                }
            }

            if (!swapped)
                break;
        }
    }

    int main() {
        int arr[] = {64, 34, 25, 12, 22, 11, 90};
        int n = sizeof(arr) / sizeof(arr[0]);

        bubbleSort(arr, n);

        for (int i = 0; i < n; i++)
            cout << arr[i] << " ";

        return 0;
    }
      `
    },
  },
};
