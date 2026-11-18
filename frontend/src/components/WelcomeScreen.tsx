import { TrendingUp, Globe, Cpu, Lightbulb } from "lucide-react";
import { InputForm } from "./InputForm";

interface WelcomeScreenProps {
  handleSubmit: (
    submittedInputValue: string,
    effort: string,
    model: string
  ) => void;
  onCancel: () => void;
  isLoading: boolean;
}

const SUGGESTIONS = [
  { icon: TrendingUp, text: "2026 年新能源汽车出海的主要趋势是什么？" },
  { icon: Globe, text: "如何评价 DeepSeek 成立 Harness 团队？" },
  { icon: Cpu, text: "具身智能近期有哪些值得关注的突破？" },
  { icon: Lightbulb, text: "帮我调研一下固态电池产业链的上中下游格局" },
];

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  handleSubmit,
  onCancel,
  isLoading,
}) => (
  <div className="relative h-full flex flex-col items-center justify-center text-center px-4 flex-1 w-full max-w-3xl mx-auto gap-6">
    <div className="animate-fadeInUp">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 border border-indigo-100 px-3 py-1 text-xs font-medium text-indigo-600 mb-5">
        <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" />
        DeepResearch 已就绪
      </span>
      <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
        你好，行业专家已就位
      </h1>
      <p className="text-lg md:text-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 bg-clip-text text-transparent font-semibold mb-2">
        专业 · 广博 · 迅捷
      </p>
      <p className="text-base md:text-lg text-slate-500">
        描述你的研究需求，智能体将自动规划、检索、分析并撰写专业报告
      </p>
    </div>

    <div className="w-full mt-2 animate-fadeInUp animation-delay-200">
      <InputForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
        onCancel={onCancel}
        hasHistory={false}
      />
    </div>

    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2 animate-fadeInUp animation-delay-400">
      {SUGGESTIONS.map(({ icon: Icon, text }) => (
        <button
          key={text}
          type="button"
          onClick={() => handleSubmit(text, "low", "qwen-turbo-latest")}
          className="group flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white/80
                     px-3.5 py-2.5 text-left text-sm text-slate-600
                     hover:border-indigo-300 hover:bg-indigo-50/60 hover:text-indigo-700
                     transition-all duration-200 cursor-pointer"
        >
          <Icon className="h-4 w-4 shrink-0 text-indigo-500 group-hover:scale-110 transition-transform duration-200" />
          <span className="truncate">{text}</span>
        </button>
      ))}
    </div>

    <p className="text-xs text-slate-400 animate-fadeInUp animation-delay-600">
      基于大语言模型的多智能体深度搜索与研究
    </p>
  </div>
);
