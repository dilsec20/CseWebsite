#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;

    vector<int> nums(n);
    for (int i = 0; i < n; i++) {
        cin >> nums[i];
    }

    int target;
    cin >> target;

    unordered_map<int, int> mp; // value -> index

    for (int i = 0; i < n; i++) {
        int need = target - nums[i];

        // Check if the complement exists
        if (mp.find(need) != mp.end()) {
            cout << mp[need] << " " << i;
            return 0;
        }

        // Store value and index
        mp[nums[i]] = i;
    }

    return 0;
}
