import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, X, ChevronRight } from 'lucide-react';

interface PrivacyModalProps {
    isOpen: boolean;
    onClose: () => void;
    onToggleDoNotShowToday: (checked: boolean) => void;
    onOpenPolicy: () => void;
}

export default function PrivacyModal({ isOpen, onClose, onToggleDoNotShowToday, onOpenPolicy }: PrivacyModalProps) {
    const [isChecked, setIsChecked] = useState(false);

    if (!isOpen) return null;

    const handleConfirm = () => {
        onToggleDoNotShowToday(isChecked);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="bg-white rounded-[2.5rem] w-full max-w-md shadow-2xl border-2 border-orange-100 overflow-hidden relative"
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    >
                        {/* 상단 컬러 띠 */}
                        <div className="h-4 bg-gradient-to-r from-amber-300 via-orange-400 to-rose-400 w-full" />

                        <div className="p-8 flex flex-col items-center text-center">
                            {/* 아이콘 */}
                            <div className="w-16 h-16 rounded-full bg-orange-100 border border-orange-200 flex items-center justify-center mb-5 shrink-0 shadow-sm">
                                <AlertCircle className="w-8 h-8 text-orange-500" />
                            </div>

                            {/* 제목 및 설명 */}
                            <h2 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight mb-2">
                                개인정보 보호 안내
                            </h2>
                            <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-sm mb-6">
                                본 아키랩스(AKLabs) AI 실습 포털은 서비스 제공 및 학생 기록 관리를 위해 최소한의 개인정보를 수집 및 이용합니다.
                            </p>

                            {/* 벤토 스타일 코어 요약 박스 */}
                            <div className="w-full bg-slate-50 rounded-2xl p-4 border border-slate-100 text-left mb-6 space-y-2.5 shadow-inner">
                                <div className="flex items-start gap-2 text-[13px]">
                                    <span className="text-orange-500 font-black shrink-0">•</span>
                                    <p className="font-bold text-slate-700">수집 목적: 학습 이력 관리 및 식별</p>
                                </div>
                                <div className="flex items-start gap-2 text-[13px]">
                                    <span className="text-orange-500 font-black shrink-0">•</span>
                                    <p className="font-bold text-slate-700">수집 항목: 아이디(ID), 비밀번호 (최소화)</p>
                                </div>
                                <button
                                    onClick={onOpenPolicy}
                                    className="w-full mt-2 flex items-center justify-between px-3 py-2 bg-white rounded-xl border border-orange-100 text-[12px] font-black text-orange-600 hover:bg-orange-50 transition-colors shadow-sm"
                                >
                                    상세 처리방침 전문 보기
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>

                            {/* 제어 영역 (하루 보지 않기 등) */}
                            <div className="w-full flex items-center justify-between mb-6 px-1">
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${isChecked ? 'bg-orange-500 border-orange-500 shadow-md' : 'border-slate-300 group-hover:border-orange-400'}`}>
                                        {isChecked && <X className="w-3.5 h-3.5 text-white stroke-[4]" />}
                                    </div>
                                    <input
                                        type="checkbox"
                                        className="hidden"
                                        checked={isChecked}
                                        onChange={(e) => setIsChecked(e.target.checked)}
                                    />
                                    <span className="text-slate-500 text-xs font-bold group-hover:text-slate-700 transition-colors">
                                        오늘 하루 보지 않기
                                    </span>
                                </label>
                            </div>

                            {/* 액션 버튼 */}
                            <button
                                onClick={handleConfirm}
                                className="w-full py-4 rounded-2xl bg-orange-500 hover:bg-orange-400 text-white font-black text-sm transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 border-b-4 border-orange-600 active:border-b-0 active:translate-y-1"
                            >
                                동의 및 확인
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
