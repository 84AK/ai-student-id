import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, ChevronDown, ChevronUp, Share2, Download, AlertCircle, RefreshCw, Bot } from 'lucide-react';
import { toPng } from 'html-to-image';
import download from 'downloadjs';

// ---- 추가 컴포넌트 ----
import PrivacyModal from './components/PrivacyModal';
import PrivacyPolicyModal from './components/PrivacyPolicyModal';
import Footer from './components/Footer';

// ---- SVG 로고 컴포넌트 ----
const GoogleIcon = ({ className = "w-5 h-5 mr-1.5 shrink-0" }) => (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
);

const MicrosoftIcon = ({ className = "w-5 h-5 mr-1.5 shrink-0" }) => (
    <svg className={className} viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg">
        <path fill="#f35325" d="M1 1h10v10H1z" />
        <path fill="#81bc06" d="M12 1h10v10H12z" />
        <path fill="#05a6f0" d="M1 12h10v10H1z" />
        <path fill="#ffba08" d="M12 12h10v10H12z" />
    </svg>
);

// ---- 귀여운 일러스트 아바타 SVG ----
const BoyAvatarSVG = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
        <circle cx="50" cy="50" r="45" fill="#FFE0B2" />
        <path d="M 25 45 Q 50 10 75 45 L 75 80 Q 50 100 25 80 Z" fill="#FFCC80" />
        {/* 머리카락 */}
        <path d="M 20 45 Q 50 -10 80 45 Q 50 20 20 45 Z" fill="#6D4C41" />
        <path d="M 20 45 C 20 60, 10 50, 15 35" fill="#6D4C41" stroke="#6D4C41" strokeWidth="4" strokeLinecap="round" />
        <path d="M 80 45 C 80 60, 90 50, 85 35" fill="#6D4C41" stroke="#6D4C41" strokeWidth="4" strokeLinecap="round" />
        {/* 눈, 볼터치, 입 */}
        <circle cx="38" cy="55" r="4" fill="#3E2723" />
        <circle cx="62" cy="55" r="4" fill="#3E2723" />
        <circle cx="30" cy="62" r="5" fill="#FF8A80" opacity="0.6" />
        <circle cx="70" cy="62" r="5" fill="#FF8A80" opacity="0.6" />
        <path d="M 45 66 Q 50 72 55 66" stroke="#3E2723" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        {/* 학사모 */}
        <path d="M 15 25 L 50 10 L 85 25 L 50 40 Z" fill="#212121" />
        <path d="M 50 25 L 85 45 L 85 65" stroke="#FFCA28" strokeWidth="2.5" fill="none" />
        <circle cx="85" cy="68" r="4" fill="#FFCA28" />
    </svg>
);

const GirlAvatarSVG = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
        {/* 뒷머리 */}
        <circle cx="50" cy="55" r="40" fill="#4E342E" />
        <path d="M 15 50 Q 5 70 20 90 Q 50 90 80 90 Q 95 70 85 50 Z" fill="#4E342E" />
        <circle cx="50" cy="50" r="45" fill="#FFCDD2" />
        <path d="M 25 45 Q 50 15 75 45 L 75 75 Q 50 95 25 75 Z" fill="#FFCC80" />
        {/* 앞머리 */}
        <path d="M 15 45 Q 30 15 50 30 Q 70 15 85 45 Q 50 10 15 45 Z" fill="#4E342E" />
        {/* 눈, 볼터치, 입 */}
        <path d="M 33 55 Q 38 52 43 55" stroke="#3E2723" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M 57 55 Q 62 52 67 55" stroke="#3E2723" strokeWidth="3" strokeLinecap="round" fill="none" />
        <circle cx="30" cy="62" r="6" fill="#FF5252" opacity="0.5" />
        <circle cx="70" cy="62" r="6" fill="#FF5252" opacity="0.5" />
        <path d="M 46 68 Q 50 72 54 68" stroke="#3E2723" strokeWidth="3" strokeLinecap="round" fill="none" />
        {/* 학사모 */}
        <path d="M 15 25 L 50 10 L 85 25 L 50 40 Z" fill="#212121" />
        <path d="M 50 25 L 80 40 L 80 60" stroke="#FFCA28" strokeWidth="2.5" fill="none" />
        <circle cx="80" cy="63" r="4" fill="#FFCA28" />
    </svg>
);

function App() {
    const [showDetails, setShowDetails] = useState(false);
    const [generateMode, setGenerateMode] = useState(false);
    const [accountInfo, setAccountInfo] = useState({ id: '', password: '', type: 'Google 계정', avatar: 'boy' });
    const [isCapturing, setIsCapturing] = useState(false);

    // 개인정보 관련 상태
    const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
    const [isPrivacyPolicyModalOpen, setIsPrivacyPolicyModalOpen] = useState(false);

    const cardRef = useRef<HTMLDivElement>(null);

    // 초기 진입 시 LocalStorage 검증
    useEffect(() => {
        const hideUntil = localStorage.getItem("hidePrivacyModalUntil");
        if (!hideUntil || new Date(hideUntil) < new Date()) {
            setIsPrivacyModalOpen(true);
        }
    }, []);

    // '하루 보지 않기' 핸들러
    const handleToggleDoNotShowToday = (checked: boolean) => {
        if (checked) {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(0, 0, 0, 0); // 자정 만료
            localStorage.setItem("hidePrivacyModalUntil", tomorrow.toISOString());
        }
    };

    const mainServices = [
        {
            id: 'google',
            name: 'Google 계정',
            icon: <GoogleIcon className="w-8 h-8 mr-2" />,
            badge: 'Gemini, 공통 웹 서비스 연동용',
            desc: '13세 이상 자녀 본인 명의 계정 또는 14세 미만 Family Link 감독 계정',
            link: 'https://accounts.google.com/signup',
            color: 'bg-white border-orange-100 text-slate-800',
            badgeColor: 'bg-blue-50 text-blue-600 border-blue-100',
            btnColor: 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/20 text-white',
        },
        {
            id: 'microsoft',
            name: 'Microsoft 계정',
            icon: <MicrosoftIcon className="w-7 h-7 mr-2" />,
            badge: 'Bing Copilot, ChatGPT용',
            desc: '13세 이상 가입 가능. AI 기능 원활한 사용을 위해 부모님 계정 사용 권장',
            link: 'https://signup.live.com/',
            color: 'bg-white border-orange-100 text-slate-800',
            badgeColor: 'bg-emerald-50 text-emerald-600 border-emerald-100',
            btnColor: 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20 text-white',
        }
    ];

    const handleCapture = async (action: 'download' | 'share') => {
        if (!cardRef.current) return;

        // 이메일이나 비번이 비어있으면 경고
        if (!accountInfo.id || !accountInfo.password) {
            alert("아이디와 비밀번호를 모두 입력해주세요.");
            return;
        }

        try {
            setIsCapturing(true);
            await new Promise(resolve => setTimeout(resolve, 150));

            const dataUrl = await toPng(cardRef.current, {
                cacheBust: true,
                quality: 1,
                pixelRatio: 4,
                style: {
                    transform: 'scale(1)',
                    background: '#ffffff',
                    borderRadius: '24px',
                    margin: '0',
                    boxShadow: 'none',
                },
            });

            const fileName = `AI_학생증_${accountInfo.type.replace(/\s+/g, '')}.png`;

            if (action === 'download') {
                download(dataUrl, fileName);
            } else if (action === 'share') {
                const blob = await (await fetch(dataUrl)).blob();
                const file = new File([blob], fileName, { type: blob.type });

                if (navigator.canShare && navigator.canShare({ files: [file] })) {
                    await navigator.share({
                        title: '수업용 AI 계정 정보',
                        text: '엄마/아빠가 준비한 재미있는 AI 수업용 프리패스 학생증입니다! 저장해뒀다가 실습할 때 꺼내서 보세요 ✨',
                        files: [file],
                    });
                } else {
                    alert('현재 브라우저에서는 메신저 직접 공유를 지원하지 않아 이미지로 단말기에 우선 저장됩니다.');
                    download(dataUrl, fileName);
                }
            }
        } catch (err) {
            console.error('이미지 생성 실패:', err);
            alert('이미지 생성에 실패했습니다. 다시 시도해 주세요.');
        } finally {
            setIsCapturing(false);
        }
    };

    return (
        <div className="relative min-h-screen bg-[#FFFDF7] pb-20 overflow-hidden font-sans text-amber-950 break-keep">
            {/* 웜 테마 배경 장식 효과 */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-60">
                <div className="absolute top-[-5%] left-[-10%] w-[50vw] h-[50vh] bg-amber-200/40 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-5%] w-[50vw] h-[50vh] bg-orange-200/30 blur-[120px] rounded-full" />
                <div className="absolute top-[30%] right-[10%] w-[30vw] h-[30vh] bg-yellow-300/20 blur-[100px] rounded-full" />
            </div>

            <main className="max-w-5xl mx-auto px-6 pt-16 md:pt-24 pb-12 relative z-10">

                {/* 헤더 타이틀 영역 */}
                <motion.div
                    className="text-center mb-14"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 border border-orange-200 text-sm text-orange-800 font-bold mb-6 shadow-sm">
                        <AlertCircle className="w-4 h-4 text-orange-500" />
                        <span>AI 수업 대비: 복잡한 준비 없이 딱 2개만!</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-amber-950 mb-5 leading-tight drop-shadow-sm">
                        학교 AI 실습 준비,<br />
                        <span className="text-blue-600">구글</span>과 <span className="text-emerald-600">마이크로소프트</span><br className="md:hidden" /> 계정이면 충분해요!🎒
                    </h1>
                    <p className="text-amber-800/80 md:text-lg max-w-2xl mx-auto leading-relaxed font-medium">
                        아이들이 학교 컴퓨터에서 다양한 AI 서비스(ChatGPT, Gemini 등)를 실습할 수 있도록,<br className="hidden md:block" /> 이 공용 플랫폼 계정을 부모님께서 미리 확인해 주세요.
                    </p>
                </motion.div>

                {/* 메인 서비스 가이드 카드 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
                    {mainServices.map((service, index) => (
                        <motion.div
                            key={service.id}
                            className={`p-8 md:p-10 flex flex-col rounded-[2.5rem] border-2 shadow-xl shadow-amber-900/5 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-amber-900/10 ${service.color}`}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 + index * 0.1 }}
                        >
                            <div className="mb-4 flex items-start justify-between">
                                <span className={`text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full border shadow-sm ${service.badgeColor}`}>
                                    {service.badge}
                                </span>
                            </div>

                            {/* 타이틀 로고 표시부 */}
                            <h2 className="text-2xl md:text-3xl font-black mt-2 mb-3 flex items-center text-slate-800 tracking-tight">
                                {service.icon}
                                {service.name}
                            </h2>

                            <p className="text-slate-500 text-sm md:text-base mb-8 leading-relaxed flex-grow font-semibold">
                                {service.desc}
                            </p>

                            <a
                                href={service.link}
                                target="_blank"
                                rel="noreferrer"
                                className={`w-full py-4 px-4 rounded-2xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 font-bold text-[15px] hover:-translate-y-0.5 ${service.btnColor}`}
                            >
                                <UserPlus className="w-5 h-5" />
                                계정 만들기 바로가기
                            </a>
                        </motion.div>
                    ))}
                </div>

                {/* 💡 신규 기능: 서류 없는 학생증 카드 생성기 */}
                <motion.div
                    className="bg-white rounded-[2.5rem] shadow-2xl shadow-amber-900/5 mb-14 border-2 border-orange-100 overflow-hidden relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    {/* 장식용 그라데이션 라인 */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-300 via-orange-400 to-rose-400"></div>

                    <div className="p-8 md:p-12">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
                            <div>
                                <h3 className="text-2xl md:text-3xl font-black text-slate-800 flex items-center gap-3 mb-3 tracking-tight">
                                    💡 내 아이를 위한 "AI 프리패스"<br className="block sm:hidden" /> 학생증 발급기
                                </h3>
                                <p className="text-slate-500 font-medium leading-relaxed max-w-xl">
                                    학교 컴퓨터는 재부팅 시 모든 정보가 지워집니다. 아이가 실습 때 바로 꺼내볼 수 있도록 비밀번호가 담긴 <strong className="text-orange-500 font-bold">이미지형 보안 학생증</strong>을 폰에 저장하거나 전송해 주세요!<br className="hidden md:block" />
                                    (안심하세요! 서버 저장 없이 브라우저 내에서만 생성되는 100% 보안 방식입니다.)
                                </p>
                            </div>

                            {!generateMode && (
                                <button
                                    onClick={() => setGenerateMode(true)}
                                    className="shrink-0 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-300 hover:to-orange-300 text-white font-black text-lg transition-all shadow-xl hover:shadow-orange-400/30 hover:-translate-y-1 flex items-center gap-2 w-full md:w-auto justify-center border-b-4 border-orange-500 active:border-b-0 active:translate-y-1"
                                >
                                    학생증 이미지 만들기 시작
                                </button>
                            )}
                        </div>

                        {/* 카드 생성 모드 UI */}
                        <AnimatePresence>
                            {generateMode && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="border-t-2 border-orange-50 pt-10"
                                >
                                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">

                                        {/* 데이터 입력 폼 */}
                                        <div className="space-y-6 w-full max-w-md lg:max-w-none lg:flex-1">
                                            <div className="bg-sky-50 border border-sky-100 rounded-xl p-4 text-xs text-sky-700 font-bold shadow-sm">
                                                🛡️ 안심 안내: 여기에 입력하시는 정보는 생성 즉시 휘발되며 절대로 서버에 저장되지 않습니다.
                                            </div>

                                            <div>
                                                <label className="block text-sm font-bold text-slate-600 mb-2">어떤 계정인가요?</label>
                                                <select
                                                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3.5 text-slate-800 font-medium focus:outline-none focus:border-orange-300 focus:ring-4 focus:ring-orange-100 transition-all cursor-pointer"
                                                    value={accountInfo.type}
                                                    onChange={(e) => setAccountInfo({ ...accountInfo, type: e.target.value })}
                                                >
                                                    <option>Google 계정</option>
                                                    <option>Microsoft 계정</option>
                                                    <option>OpenAI (ChatGPT) 직접가입</option>
                                                </select>
                                            </div>

                                            {/* 아바타 선택 영역 */}
                                            <div>
                                                <label className="block text-sm font-bold text-slate-600 mb-2">학생 아바타 선택</label>
                                                <div className="flex gap-4">
                                                    <label className={`flex-1 flex flex-col items-center justify-center gap-2 py-4 rounded-2xl border-2 cursor-pointer transition-all ${accountInfo.avatar === 'boy' ? 'bg-orange-50 border-orange-400 shadow-inner' : 'bg-white border-slate-100 hover:border-orange-200 hover:bg-orange-50/30 shadow-sm'}`}>
                                                        <input type="radio" className="hidden" name="avatar" value="boy" checked={accountInfo.avatar === 'boy'} onChange={() => setAccountInfo({ ...accountInfo, avatar: 'boy' })} />
                                                        <div className="w-12 h-12"><BoyAvatarSVG /></div>
                                                        <span className={`font-bold text-sm ${accountInfo.avatar === 'boy' ? 'text-orange-700' : 'text-slate-500'}`}>남학생</span>
                                                    </label>
                                                    <label className={`flex-1 flex flex-col items-center justify-center gap-2 py-4 rounded-2xl border-2 cursor-pointer transition-all ${accountInfo.avatar === 'girl' ? 'bg-orange-50 border-orange-400 shadow-inner' : 'bg-white border-slate-100 hover:border-orange-200 hover:bg-orange-50/30 shadow-sm'}`}>
                                                        <input type="radio" className="hidden" name="avatar" value="girl" checked={accountInfo.avatar === 'girl'} onChange={() => setAccountInfo({ ...accountInfo, avatar: 'girl' })} />
                                                        <div className="w-12 h-12"><GirlAvatarSVG /></div>
                                                        <span className={`font-bold text-sm ${accountInfo.avatar === 'girl' ? 'text-orange-700' : 'text-slate-500'}`}>여학생</span>
                                                    </label>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-bold text-slate-600 mb-2">아이디 (이메일 주소)</label>
                                                <input
                                                    type="text"
                                                    placeholder="example@gmail.com"
                                                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3.5 text-slate-800 font-medium focus:outline-none focus:border-orange-300 focus:ring-4 focus:ring-orange-100 transition-all"
                                                    value={accountInfo.id}
                                                    onChange={(e) => setAccountInfo({ ...accountInfo, id: e.target.value })}
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-bold text-slate-600 mb-2">비밀번호</label>
                                                <input
                                                    type="text"
                                                    placeholder="대소문자를 맞춰서 정확히 입력하세요"
                                                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3.5 text-slate-800 font-medium focus:outline-none focus:border-orange-300 focus:ring-4 focus:ring-orange-100 transition-all"
                                                    value={accountInfo.password}
                                                    onChange={(e) => setAccountInfo({ ...accountInfo, password: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        {/* ✨ 실시간 렌더링 카드 (일러스트 스타일 학생증 테마) */}
                                        <div className="flex flex-col items-center gap-5 shrink-0 mt-8 lg:mt-0">

                                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                                                <span className="text-sm font-black text-center">✨ 발급될 학생증 미리보기</span>
                                            </div>

                                            {/* 학생증 본체 (렌더링 영역) */}
                                            <div
                                                ref={cardRef}
                                                // 학생증 비율(가로형) 및 크기 지정
                                                className="w-[360px] sm:w-[420px] aspect-[1.58/1] rounded-3xl relative overflow-hidden bg-white flex flex-col justify-between font-sans border-2 border-slate-100 shadow-xl"
                                            >
                                                {/* 1) 상단 컬러 띠 (학교 바인더 느낌) */}
                                                <div className="h-14 bg-[#FFC107] w-full flex items-center px-6 relative shrink-0 border-b-2 border-amber-400">
                                                    {/* 핀/펀치홀 장식 */}
                                                    <div className="absolute top-2 left-6 w-3 h-3 rounded-full bg-white shadow-inner"></div>
                                                    <div className="absolute top-2 right-6 w-3 h-3 rounded-full bg-white shadow-inner"></div>

                                                    <h4 className="text-amber-950 text-xl font-black tracking-tight drop-shadow-sm">AI 통합 실습 학생증</h4>
                                                    <div className="ml-auto bg-white/90 text-amber-800 text-[10px] font-black px-2.5 py-1 rounded-full shadow-sm">
                                                        2026 PASS
                                                    </div>
                                                </div>

                                                {/* 2) 은은한 모눈종이 학교 노트 배경 */}
                                                <div className="absolute inset-0 top-14 opacity-[0.03] pointer-events-none"
                                                    style={{ backgroundImage: 'linear-gradient(90deg, #1e3a8a 1.5px, transparent 1.5px), linear-gradient(#1e3a8a 1.5px, transparent 1.5px)', backgroundSize: '16px 16px' }}
                                                />

                                                {/* 3) 본문 텍스트 및 아바타 레이아웃 */}
                                                <div className="flex-1 p-5 md:p-6 flex gap-5 relative z-10 items-center justify-center">

                                                    {/* 왼쪽: 아바타 일러스트 영역 */}
                                                    <div className="w-[84px] md:w-[96px] aspect-[3/4] rounded-2xl bg-[#FFF8E1] border-2 border-dashed border-[#FFE082] flex flex-col items-center justify-center shrink-0 shadow-sm overflow-hidden p-2 relative">
                                                        <div className="w-16 h-16 md:w-[72px] md:h-[72px] flex items-center justify-center mb-1">
                                                            {accountInfo.avatar === 'boy' ? <BoyAvatarSVG /> : <GirlAvatarSVG />}
                                                        </div>
                                                        <span className="text-orange-500 text-[9px] md:text-[10px] font-black tracking-widest leading-none z-10">STUDENT</span>
                                                    </div>

                                                    {/* 오른쪽: 계정 정보 */}
                                                    <div className="flex-1 space-y-2.5 min-w-0 pb-1">
                                                        <div>
                                                            <div className="inline-flex items-center px-3 py-1.5 rounded text-[11px] md:text-[13px] font-black bg-blue-50 text-blue-700 border border-blue-200 shadow-sm mb-1 leading-none">
                                                                {accountInfo.type.includes('Google') && <GoogleIcon className="w-4 h-4 mr-1.5" />}
                                                                {accountInfo.type.includes('Microsoft') && <MicrosoftIcon className="w-4 h-4 mr-1.5" />}
                                                                {!accountInfo.type.includes('Google') && !accountInfo.type.includes('Microsoft') && <Bot className="w-4 h-4 mr-1.5 text-blue-600" />}
                                                                {accountInfo.type}
                                                            </div>
                                                        </div>

                                                        {/* ID / Email */}
                                                        <div className="pb-1">
                                                            <p className="text-slate-400 text-[9px] md:text-[10px] uppercase font-black tracking-wider mb-1 px-1">이메일 계정 (ID)</p>
                                                            <div className="text-slate-700 font-bold text-[13px] md:text-[14px] bg-slate-50 px-3 py-2 rounded-xl border border-slate-200 truncate w-full shadow-inner leading-none">
                                                                {accountInfo.id || '아이디를 입력하세요'}
                                                            </div>
                                                        </div>

                                                        {/* Password */}
                                                        <div>
                                                            <p className="text-slate-400 text-[9px] md:text-[10px] uppercase font-black tracking-wider mb-1 px-1">비밀번호 (PW)</p>
                                                            <div className="text-slate-800 font-mono text-[14px] md:text-[16px] font-bold tracking-[0.1em] bg-slate-50 px-3 py-2 rounded-xl border border-slate-200 w-full truncate shadow-inner leading-none">
                                                                {accountInfo.password || '••••••••'}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* 4) 하단 바코드 라인 */}
                                                <div className="h-9 bg-slate-50 border-t border-slate-200 flex items-center px-6 justify-between shrink-0">
                                                    <div className="font-mono text-slate-300 text-[10px] tracking-[0.1em] opacity-80 mt-[-2px] overflow-hidden whitespace-nowrap">
                                                        ||| || ||| | || | ||| || ||
                                                    </div>
                                                    <div className="text-slate-400 text-[9px] font-bold tracking-wider">
                                                        Do not share with strangers
                                                    </div>
                                                </div>
                                            </div>

                                            {/* 액션 버튼 */}
                                            <div className="flex gap-4 w-[360px] sm:w-[420px] mt-2">
                                                <button
                                                    onClick={() => handleCapture('download')}
                                                    disabled={isCapturing}
                                                    className="flex-1 bg-slate-800 hover:bg-slate-700 text-white py-4 rounded-2xl text-sm font-black flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 border-b-4 border-slate-900 active:border-b-0 active:translate-y-1 disabled:opacity-50 disabled:translate-y-0"
                                                >
                                                    {isCapturing ? <RefreshCw className="w-5 h-5 animate-spin text-slate-400" /> : <Download className="w-5 h-5 text-slate-300" />}
                                                    갤러리 저장
                                                </button>
                                                <button
                                                    onClick={() => handleCapture('share')}
                                                    disabled={isCapturing}
                                                    className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl text-sm font-black flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/20 hover:shadow-xl hover:-translate-y-0.5 border-b-4 border-blue-700 active:border-b-0 active:translate-y-1 disabled:opacity-50 disabled:translate-y-0"
                                                >
                                                    {isCapturing ? <RefreshCw className="w-5 h-5 animate-spin text-blue-300" /> : <Share2 className="w-5 h-5 text-blue-200" />}
                                                    메신저 전송
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* 아코디언 UI: 서비스별 자세한 연령 가이드 숨김 처리 */}
                <motion.div
                    className="bg-white rounded-[2.5rem] shadow-xl shadow-amber-900/5 mb-20 border border-orange-100 overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    <button
                        onClick={() => setShowDetails(!showDetails)}
                        className="w-full p-8 md:p-10 flex items-center justify-between text-left focus:outline-none group hover:bg-orange-50/50 transition-colors"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-orange-100 border border-orange-200 flex items-center justify-center shrink-0">
                                <AlertCircle className="w-6 h-6 text-orange-500 group-hover:text-orange-600 transition-colors" />
                            </div>
                            <h3 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">더 자세히 알아보기: 서비스별 엄격한 연령 제한 정책</h3>
                        </div>
                        {showDetails ? <ChevronUp className="w-6 h-6 text-slate-400" /> : <ChevronDown className="w-6 h-6 text-slate-400" />}
                    </button>

                    <AnimatePresence>
                        {showDetails && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="border-t-2 border-orange-50"
                            >
                                <div className="p-8 md:p-10 space-y-6 text-slate-600 bg-orange-50/30 font-medium">
                                    <div>
                                        <strong className="text-slate-800 font-bold block mb-2 text-lg">ChatGPT (OpenAI) 정책</strong>
                                        <p className="leading-relaxed text-[15px]">기본 13세 이상 이용 가능합니다. 만 13세~18세 사용자는 원칙적으로 부모님(보호자)의 동의가 필요합니다. 때문에 자녀가 자유롭게 계정을 생성하기 어려울 수 있으니 연동 계정을 준비해 주시는 것을 권장합니다.</p>
                                    </div>
                                    <div className="pt-4 border-t border-orange-100">
                                        <strong className="text-slate-800 font-bold block mb-2 text-lg">Grok (xAI) 정책</strong>
                                        <p className="leading-relaxed text-[15px]">13세 이상 가입 가능하며, 13~17세는 부모 동의 규칙이 있습니다. 특히 최신 모델 등 강력한 기능 사용 시 유료 구독(X Premium 권한)이 필요한 경우가 있어 학부모님의 적극적인 결제/계정 지원이 필요할 수 있습니다.</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

            </main>

            {/* 고정 푸터 */}
            <Footer onOpenPolicy={() => setIsPrivacyPolicyModalOpen(true)} />

            {/* 안내 모달 */}
            <PrivacyModal 
                isOpen={isPrivacyModalOpen} 
                onClose={() => setIsPrivacyModalOpen(false)} 
                onToggleDoNotShowToday={handleToggleDoNotShowToday}
                onOpenPolicy={() => {
                    setIsPrivacyModalOpen(false);
                    setIsPrivacyPolicyModalOpen(true);
                }}
            />

            {/* 상세 방침 모달 */}
            <PrivacyPolicyModal 
                isOpen={isPrivacyPolicyModalOpen} 
                onClose={() => setIsPrivacyPolicyModalOpen(false)} 
            />
        </div>
    );
}

export default App;
