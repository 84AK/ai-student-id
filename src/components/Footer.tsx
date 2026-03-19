import { Heart } from 'lucide-react';

interface FooterProps {
    onOpenPolicy: () => void;
}

export default function Footer({ onOpenPolicy }: FooterProps) {
    return (
        <footer className="w-full bg-white/40 backdrop-blur-md border-t border-orange-100 py-8 relative z-20">
            <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
                
                {/* 왼쪽: 저작권 및 링크 */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <div className="flex items-center gap-1.5 text-[13px] font-bold text-slate-500 mb-1">
                        <span>Made with</span>
                        <Heart className="w-4 h-4 text-rose-400 fill-rose-400 animate-pulse" />
                        <span>by</span>
                        <a 
                            href="https://litt.ly/aklabs" 
                            target="_blank" 
                            rel="noreferrer"
                            className="text-orange-600 hover:text-orange-500 underline underline-offset-2 decoration-orange-300 transition-colors"
                        >
                            아크랩스 (AKLabs)
                        </a>
                    </div>
                    <p className="text-[12px] text-slate-400 font-medium">
                        © 2026 AKLabs. All rights reserved.
                    </p>
                </div>

                {/* 오른쪽: 개인정보 처리방침 버튼 */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={onOpenPolicy}
                        className="text-[13px] font-black text-slate-600 hover:text-orange-600 transition-all hover:scale-105 active:scale-95 flex items-center gap-1 group"
                    >
                        개인정보 처리방침
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-400 scale-0 group-hover:scale-110 transition-transform" />
                    </button>
                </div>
            </div>
        </footer>
    );
}
