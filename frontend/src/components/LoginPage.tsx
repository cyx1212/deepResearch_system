import { useState, FormEvent } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Loader2, Compass, Layers, Sparkles, ShieldCheck, ArrowRight } from "lucide-react";

const FEATURES = [
  {
    icon: Compass,
    title: "深度网络研究",
    desc: "多轮搜索与反思，自动汇聚可信来源",
  },
  {
    icon: Layers,
    title: "多专家协作",
    desc: "研究智能体与写作智能体分工配合",
  },
  {
    icon: Sparkles,
    title: "实时研究流",
    desc: "计划、检索、分析全程可视化呈现",
  },
  {
    icon: ShieldCheck,
    title: "结果可溯源",
    desc: "引用来源清晰标注，结论有据可查",
  },
];

export function LoginPage() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password) return;

    setError(null);
    setLoading(true);

    try {
      await login(username.trim(), password);
    } catch (err: any) {
      setError(err.message || "登录失败，请重试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-slate-50 text-slate-800">
      {/* 左侧品牌展示面板 */}
      <aside className="hidden lg:flex flex-col justify-between w-[46%] xl:w-1/2 p-12 relative overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 text-white">
        {/* 装饰光斑 */}
        <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-24 h-[28rem] w-[28rem] rounded-full bg-fuchsia-400/20 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12),transparent_45%)]" />

        <div className="relative flex items-center gap-3 animate-fadeIn">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/30 backdrop-blur">
            <Compass className="h-6 w-6" />
          </div>
          <div>
            <p className="text-lg font-semibold tracking-wide">DeepResearch</p>
            <p className="text-xs text-white/70">你的行业 AI 专家</p>
          </div>
        </div>

        <div className="relative space-y-8">
          <div className="space-y-4 animate-fadeInUp">
            <h1 className="text-4xl xl:text-5xl font-bold leading-tight">
              把复杂问题
              <br />
              交给深度研究
            </h1>
            <p className="max-w-md text-white/80 text-base xl:text-lg leading-relaxed">
              提出一个问题，智能体将自动规划、全网检索、交叉验证，
              为你产出结构清晰、引用完备的专业研究报告。
            </p>
          </div>

          <ul className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {FEATURES.map(({ icon: Icon, title, desc }, i) => (
              <li
                key={title}
                className="flex items-start gap-3 rounded-2xl bg-white/10 p-4 ring-1 ring-white/20 backdrop-blur-sm animate-fadeInUp"
                style={{ animationDelay: `${0.1 * (i + 1)}s` }}
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/20">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">{title}</p>
                  <p className="mt-0.5 text-xs text-white/70 leading-relaxed">{desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-xs text-white/60">
          Powered by Multi-Agent Deep Research · 让每一次提问都物有所值
        </p>
      </aside>

      {/* 右侧登录面板 */}
      <main className="flex flex-1 items-center justify-center p-6 relative">
        {/* 移动端背景渐变 */}
        <div className="pointer-events-none absolute inset-0 lg:hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600" />
        <div className="pointer-events-none absolute inset-0 lg:bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.12),transparent_55%)]" />

        <div className="relative w-full max-w-md">
          {/* 品牌（仅移动端显示） */}
          <div className="lg:hidden flex items-center gap-3 mb-8 text-white animate-fadeIn">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/30 backdrop-blur">
              <Compass className="h-6 w-6" />
            </div>
            <div>
              <p className="text-lg font-semibold tracking-wide">DeepResearch</p>
              <p className="text-xs text-white/70">你的行业 AI 专家</p>
            </div>
          </div>

          <div className="rounded-3xl bg-white/95 backdrop-blur p-8 md:p-10 shadow-2xl shadow-indigo-900/10 ring-1 ring-slate-100 animate-fadeInUp">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">欢迎回来</h2>
              <p className="mt-2 text-sm text-slate-500">
                登录后即可开启你的专属深度研究之旅
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">
                  用户名
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl
                             text-slate-800 placeholder-slate-400
                             focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10
                             transition-all duration-200"
                  placeholder="请输入用户名"
                  autoComplete="username"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">
                  密码
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl
                             text-slate-800 placeholder-slate-400
                             focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10
                             transition-all duration-200"
                  placeholder="请输入密码"
                  autoComplete="current-password"
                  disabled={loading}
                />
              </div>

              {error && (
                <p className="text-sm text-center rounded-lg bg-red-50 text-red-500 py-2 px-3">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                disabled={loading || !username.trim() || !password}
                className="w-full mt-2 h-11 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600
                           hover:from-indigo-500 hover:to-violet-500 text-white font-medium text-base
                           shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40
                           transition-all duration-200 cursor-pointer
                           disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    登录中...
                  </>
                ) : (
                  <>
                    立即登录
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </form>

            <p className="mt-6 text-center text-xs text-slate-400">
              深度搜索 · 专家模式 · 多模型支持
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
