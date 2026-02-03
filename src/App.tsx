import { useState } from 'react';
import { Hero } from './components/Hero/Hero';
import { Background } from './components/UI/Background';
import { steps } from './data/steps';
import { BDScreen } from './components/Screens/BDScreen/NominationForm';
import { PMScreen } from './components/Screens/PMScreen/Dashboard';
import { SystemScreen } from './components/Screens/SystemScreen/SAPTerminal';
import { AnimatePresence, motion } from 'framer-motion';
import { GuidePanel } from './components/UI/GuidePanel';
import { ProjectSummary } from './components/Screens/SummaryScreen/ProjectSummary';
import { NegotiationScreen } from './components/Screens/SystemScreen/NegotiationScreen';
import { GoodsReceiptScreen } from './components/Screens/SystemScreen/GoodsReceiptScreen';
import { PaymentScreen } from './components/Screens/SystemScreen/PaymentScreen';

function App() {
    const [started, setStarted] = useState(false);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

    const currentStep = steps[currentStepIndex];

    const handleNext = () => {
        if (currentStepIndex < steps.length - 1) {
            setCurrentStepIndex(prev => prev + 1);
        }
    };

    // Explicit restart function
    const handleRestart = () => {
        setStarted(false);
        setCurrentStepIndex(0);
    };

    // Screen Router Logic
    const renderScreen = () => {
        if (!currentStep) return null;

        // Final Summary Step (Now ID 15)
        if (currentStep.id === 15) {
            return <ProjectSummary onRestart={handleRestart} />;
        }

        const role = currentStep.actor;

        switch (role) {
            case 'BD':
            case 'Customer':
                return <BDScreen onNext={handleNext} stepId={currentStep.id} />;

            case 'PM':
                // Handles 3, 4, 6, 7 and Milestone Updates 11, 13
                return <PMScreen onNext={handleNext} stepId={currentStep.id} />;

            case 'System':
                if (currentStep.id === 5) {
                    return <NegotiationScreen onNext={handleNext} stepId={currentStep.id} />;
                }
                if (currentStep.id === 8 || currentStep.id === 9) {
                    return <GoodsReceiptScreen onNext={handleNext} stepId={currentStep.id} />;
                }
                // Interleaved Payments: 10, 12, 14
                if (currentStep.id === 10 || currentStep.id === 12 || currentStep.id === 14) {
                    return <PaymentScreen onNext={handleNext} stepId={currentStep.id} />;
                }
                return <SystemScreen onNext={handleNext} stepId={currentStep.id} />;

            default:
                return <div className="text-white">Unknown Role Screen</div>;
        }
    };

    return (
        <div className="h-screen w-screen bg-[#0f172a] text-slate-200 selection:bg-sky-500/30 font-sans overflow-hidden relative">
            <Background />
            {!started ? (
                <div className="h-full w-full flex items-center justify-center relative z-10">
                    <Hero onStart={() => setStarted(true)} />
                </div>
            ) : (
                <div className="h-full w-full flex flex-col md:flex-row p-4 gap-4 relative z-10">
                    {/* Left/Top: Simulation Area */}
                    <div className="flex-1 flex flex-col h-full min-h-0">
                        {/* Progress Header - Compact */}
                        <div className="mb-4 flex items-center justify-between px-4">
                            <div>
                                <h2 className="text-xs font-semibold text-sky-400 tracking-wider uppercase">Step {currentStepIndex + 1} / {steps.length}</h2>
                                <h1 className="text-xl font-bold text-white leading-tight">{currentStep.title}</h1>
                            </div>
                            <div className="w-1/3 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-sky-500"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
                                />
                            </div>
                        </div>

                        {/* Active Screen Area - Flex Grow to fill space */}
                        <div className="flex-1 min-h-0 relative">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentStepIndex}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.05 }}
                                    transition={{ duration: 0.4, ease: "circOut" }}
                                    className="h-full w-full"
                                >
                                    {renderScreen()}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Right/Bottom: Guide Panel (Fixed width on desktop) */}
                    <div className="w-full md:w-80 lg:w-96 flex-shrink-0 h-full">
                        <GuidePanel step={currentStep} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
