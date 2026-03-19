import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
// @ts-ignore - Vite raw import
import privacyPolicyMd from '../../docs/PrivacyPolicy.md?raw';

interface PrivacyPolicyModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function PrivacyPolicyPolicyModal({ isOpen, onClose }: PrivacyPolicyModalProps) {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        className="bg-white rounded-[2.5rem] w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col shadow-2xl border-2 border-orange-100 relative"
                        initial={{ opacity: 0, scale: 0.95, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 30 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        onClick={(e) => e.stopPropagation()} // 클릭 전파 막기
                    >
                        {/* 상단 컬러 띠 */}
                        <div className="h-4 bg-gradient-to-r from-amber-300 via-orange-400 to-rose-400 w-full" />

                        {/* 헤더 */}
                        <div className="p-6 md:p-8 flex items-center justify-between border-b border-orange-50 shrink-0">
                            <h2 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">개인정보 처리방침</h2>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-500 transition-colors shadow-sm"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* 본문 콘텐츠 (마크다운) */}
                        <div className="flex-1 overflow-y-auto p-6 md:p-8 prose prose-slate max-w-none">
                            <ReactMarkdown
                                components={{
                                    h1: ({ ...props }) => <h1 className="text-2xl font-black text-slate-900 mb-4 mt-2 pb-2 border-b-2 border-orange-100" {...props} />,
                                    h2: ({ ...props }) => <h2 className="text-xl font-bold text-slate-800 mb-3 mt-6 flex items-center gap-2 " {...props} />,
                                    h3: ({ ...props }) => <h3 className="text-lg font-bold text-slate-800 mb-2 mt-4" {...props} />,
                                    p: ({ ...props }) => <p className="text-slate-600 font-medium leading-relaxed mb-4 text-[15px]" {...props} />,
                                    ul: ({ ...props }) => <ul className="list-disc pl-5 space-y-1 mb-4 text-slate-600 font-medium text-[15px]" {...props} />,
                                    li: ({ ...props }) => <li className="mb-1" {...props} />,
                                    blockquote: ({ ...props }) => (
                                        <blockquote className="bg-amber-50 border border-amber-200 rounded-2xl p-4 my-4 font-bold text-amber-800 text-[14px] shadow-sm" {...props} />
                                    ),
                                    hr: () => <hr className="my-6 border-orange-50" />,
                                    strong: ({ ...props }) => <strong className="font-extrabold text-slate-800" {...props} />,
                                }}
                            >
                                {privacyPolicyMd}
                            </ReactMarkdown>
                        </div>

                        {/* 푸터 버튼 */}
                        <div className="p-6 md:p-8 border-t border-orange-50 flex justify-end shrink-0">
                            <button
                                onClick={onClose}
                                className="px-6 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-black text-sm transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 border-b-4 border-slate-900 active:border-b-0 active:translate-y-1"
                            >
                                닫기
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
