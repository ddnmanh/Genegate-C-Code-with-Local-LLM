#include <iostream>
#include <string>

using namespace std;

int main() {
    int K, M;
    string S;
    cin >> K >> M >> S;
    int N;
    cin >> N;
    for (int i = 0; i < N; ++i) {
        int a, b, c;
        cin >> a >> b >> c;
        if (a >= S.length() || b > S.length()) continue;
        string sub = S.substr(a, b - a);
        if (c + sub.length() <= M) {
            if (c == 0) S = sub + S;
            else S.insert(c, sub);
        } else {
            int len = min(M - c + 1, static_cast<int>(sub.length()));
            S.insert(c, sub.substr(0, len));
        }
    }
    cout << S.substr(0, K) << endl;
    return 0;
}