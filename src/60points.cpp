#include <bits/stdc++.h>
using namespace std;

namespace solver
{

    const double eps = 1e-5, inf = 1e7;
    char ch[5] = {'\0', '+', '-', '*', '/'};

    struct Node
    {
        int sym; // 1+ 2- 3* 4/
        int num;
        double val;
        Node *Left, *Right;
    };

    vector<Node> data;

    string print_expr(Node x)
    {

        if (x.sym == 0)
            return to_string(x.num);

        string res;

        res += "(";
        res += print_expr(*x.Left);
        res += " ";
        res += ch[x.sym];
        res += " ";
        res += print_expr(*x.Right);
        res += ")";

        return res;
    }

    void calc(Node &x)
    {
        if (x.sym == 0)
            x.val = x.num;
        if (x.sym == 1)
            x.val = x.Left->val + x.Right->val;
        if (x.sym == 2)
            x.val = x.Left->val - x.Right->val;
        if (x.sym == 3)
            x.val = x.Left->val * x.Right->val;
        if (x.sym == 4)
            x.val = x.Left->val / x.Right->val;
    }

    vector<Node *> getExpr(vector<int> vec)
    {

        // cout << "DEBUG-FIRST : { ";
        // for (auto &p : vec)
        //     cout << p << " ";
        // cout << "}" << endl;

        if (vec.size() == 1)
        {
            data.push_back((Node){0, vec[0], (double)vec[0], NULL, NULL});
            auto cur = &data.back();

            // cout << "RETURN 1 : ";
            // print_node(*cur);

            return {cur};
        }

        int tot = (1 << vec.size());

        vector<Node *> res;

        for (int msk = 1; msk < tot - 1; msk++)
        {
            vector<int> nxt[2];

            for (int b = 0; b < (int)vec.size(); b++)
                nxt[(msk >> b) & 1].push_back(vec[b]);

            vector<Node *> tmp[2];
            tmp[0] = getExpr(nxt[0]);
            tmp[1] = getExpr(nxt[1]);

            for (auto p1 : tmp[0])
            {
                for (auto p2 : tmp[1])
                {
                    for (int sym = 1; sym <= 4; sym++)
                    {
                        if (sym == 4 && abs(p2->val) <= eps)
                            continue;
                        if ((sym % 2 == 1) && msk >= tot / 2)
                            continue;

                        data.push_back((Node){sym, 0, 0, p1, p2});
                        auto cur = &data.back();
                        calc(*cur);

                        res.push_back(cur);
                    }
                }
            }
        }

        // cout << "DEBUG-SECOND : { ";
        // for (auto &p : vec)
        //     cout << p << " ";
        // cout << "}" << endl;

        // cout << "RESULT : ";
        // for (auto p : res)
        //     cout << print_expr(*p) << endl;
        // cout << endl;

        return res;
    }

    const int ANS = 60;
    vector<Node *> solve(vector<int> vec)
    {
        data.clear();
        data.reserve(1e6);
        vector<Node *> res;

        auto ans = getExpr(vec);
        for (auto tmp : ans)
        {
            if (abs(tmp->val - ANS) <= eps)
                res.push_back(tmp);
        }

        // cout << "data - size used : " << data.size() << endl;
        // cout << "ans.size() : " << res.size() << endl;
        return res;
    }
} // namespace solver
using solver::data;
using solver::solve;

int main()
{
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    srand(time(NULL));
    for (int i = 1; i <= 100; i++)
    {
        std::cout << solve({rand() % 13 + 1, rand() % 13 + 1, rand() % 13 + 1, rand() % 13 + 1, rand() % 13 + 1}).size() << " ";
    }
    std::cout << std::endl;
}