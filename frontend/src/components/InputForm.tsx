import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { Button } from "@/components/ui/button";
import { SquarePen, Brain, Send, StopCircle, Zap, Cpu } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchAvailableModels, type ModelConfig } from "@/lib/api";

// Updated InputFormProps
interface InputFormProps {
  onSubmit: (inputValue: string, effort: string, model: string) => void;
  onCancel: () => void;
  isLoading: boolean;
  hasHistory: boolean;
}

export const InputForm = forwardRef<any, InputFormProps>(({
  onSubmit,
  onCancel,
  isLoading,
  hasHistory,
}, ref) => {
  const [internalInputValue, setInternalInputValue] = useState("");
  const [effort, setEffort] = useState("low");
  const [model, setModel] = useState("qwen-turbo-latest");
  const [availableModels, setAvailableModels] = useState<ModelConfig[]>([]);

  // 加载可用模型列表
  useEffect(() => {
    fetchAvailableModels().then((models) => {
      setAvailableModels(models);
      // 设置默认选中第一个模型
      if (models.length > 0 && model === "qwen-turbo-latest") {
        setModel(models[0].model_id);
      }
    });
  }, []);

  // 暴露给父组件的方法（用于 ChatMessagesView 的"需求确认"按钮）
  useImperativeHandle(ref, () => ({
    setInputValue(value: string) {
      setInternalInputValue(value);
    },
    submitInput(value: string) {
      const currentEffort = effort;
      const currentModel = model;
      if (value.trim()) {
        onSubmit(value, currentEffort, currentModel);
        setInternalInputValue("");
      }
    },
  }), [effort, model, onSubmit]);

  const handleInternalSubmit = (e?: React.FormEvent) => {
    console.log('handleInternalSubmit exectued.....');
    if (e) e.preventDefault();
    if (!internalInputValue.trim()) return;
    onSubmit(internalInputValue, effort, model);
    setInternalInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Submit with Ctrl+Enter (Windows/Linux) or Cmd+Enter (Mac)
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleInternalSubmit();
    }
  };

  const isSubmitDisabled = !internalInputValue.trim() || isLoading;

  return (
    <form
      onSubmit={handleInternalSubmit}
      className={`flex flex-col gap-2 p-3 pb-4`}
    >
      <div
        className={`flex flex-row items-center justify-between rounded-3xl rounded-bl-sm ${
          hasHistory ? "rounded-br-sm" : ""
        } break-words min-h-7 bg-white border border-slate-200 shadow-xl shadow-indigo-100/50 px-4 pt-3 `}
      >
        <Textarea
          value={internalInputValue}
          onChange={(e) => setInternalInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="如何评价DeepSeek成立Harness团队？"
          className={`w-full text-slate-700 placeholder-slate-400 resize-none border-0 focus:outline-none focus:ring-0 outline-none focus-visible:ring-0 shadow-none
                        md:text-base  min-h-[56px] max-h-[200px]`}
          rows={1}
        />
        <div className="-mt-3">
          {isLoading ? (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-red-500 hover:text-red-400 hover:bg-red-500/10 p-2 cursor-pointer rounded-full transition-all duration-200"
              onClick={onCancel}
            >
              <StopCircle className="h-5 w-5" />
            </Button>
          ) : (
            <Button
              type="submit"
              variant="ghost"
              className={`${
                isSubmitDisabled
                  ? "text-slate-300"
                  : "text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 hover:shadow-lg hover:shadow-indigo-600/30"
              } p-2 cursor-pointer rounded-full transition-all duration-200 text-base`}
              disabled={isSubmitDisabled}
            >
              探索
              <Send className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-row gap-2">
          <div className="flex flex-row gap-2 bg-white border border-slate-200 text-slate-600 rounded-xl rounded-t-sm pl-2  max-w-[100%] sm:max-w-[90%] shadow-sm">
            <div className="flex flex-row items-center text-sm">
              <Brain className="h-4 w-4 mr-2 text-indigo-500" />
              专家选择
            </div>
            <Select value={effort} onValueChange={setEffort}>
              <SelectTrigger className="w-[120px] bg-transparent border-none cursor-pointer">
                <SelectValue placeholder="Effort" />
              </SelectTrigger>
              <SelectContent className="bg-white border-slate-200 text-slate-700 cursor-pointer shadow-lg">
                <SelectItem
                  value="low"
                  className="hover:bg-indigo-50 focus:bg-indigo-50 cursor-pointer"
                >
                  低
                </SelectItem>
                <SelectItem
                  value="medium"
                  className="hover:bg-indigo-50 focus:bg-indigo-50 cursor-pointer"
                >
                  中
                </SelectItem>
                <SelectItem
                  value="high"
                  className="hover:bg-indigo-50 focus:bg-indigo-50 cursor-pointer"
                >
                  高
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-row gap-2 bg-white border border-slate-200 text-slate-600 rounded-xl rounded-t-sm pl-2  max-w-[100%] sm:max-w-[90%] shadow-sm">
            <div className="flex flex-row items-center text-sm ml-2">
              <Cpu className="h-4 w-4 mr-2 text-violet-500" />
              模型选择
            </div>
            <Select value={model} onValueChange={setModel}>
              <SelectTrigger className="w-[150px] bg-transparent border-none cursor-pointer">
                <SelectValue placeholder="Model" />
              </SelectTrigger>
              <SelectContent className="bg-white border-slate-200 text-slate-700 cursor-pointer shadow-lg">
                {availableModels.map((modelConfig) => {
                  const IconComponent = modelConfig.icon === "Cpu" ? Cpu : Zap;
                  return (
                    <SelectItem
                      key={modelConfig.model_id}
                      value={modelConfig.model_id}
                      className="hover:bg-indigo-50 focus:bg-indigo-50 cursor-pointer"
                    >
                      <div className="flex items-center">
                        <IconComponent className={`h-4 w-4 mr-2 text-${modelConfig.icon_color}`} />
                        {modelConfig.display_name}
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </div>
        {hasHistory && (
          <Button
            className="bg-white border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-300 cursor-pointer rounded-xl rounded-t-sm pl-2 shadow-sm"
            variant="default"
            onClick={() => window.open("/", "_blank")}
          >
            <SquarePen size={16} />
            探索新专题
          </Button>
        )}
      </div>
    </form>
  );
});
