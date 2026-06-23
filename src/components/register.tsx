import React, { useMemo, useState } from 'react';
import { getLangFromUrl, useTranslations } from "~/utils/i18n";

const formatPhoneNumber = (phone: string): string => {
    const digits = phone.replace(/\D/g, '');
    if (digits.startsWith('8') && digits.length === 11) return '+7' + digits.slice(1);
    if (digits.startsWith('7') && digits.length === 11) return '+' + digits;
    return phone;
};

export const teamSchema = null; // kept for any external imports
export type TeamSchema = any;

export function RegisterForm({ lang }: { lang: ReturnType<typeof getLangFromUrl> }) {
    const t = useMemo(() => useTranslations('apply', lang), [lang]);
    const [showMember4, setShowMember4] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [league, setLeague] = useState('junior');

    const registrationOpenDate = new Date("2026-06-22T00:00:00+05:00");
    const registrationCloseDate = new Date("2026-07-02T20:00:00+05:00");
    const now = new Date();
    const registrationNotYetOpen = now < registrationOpenDate;
    const registrationClosed = now > registrationCloseDate;

    if (registrationNotYetOpen) {
        return (
            <div className="col-span-4 flex gap-4 flex-col">
                <div className="text-primary-500 font-bold text-6xl uppercase">{t("registrationSoon")}</div>
            </div>
        );
    }

    if (registrationClosed) {
        return (
            <div className="col-span-4 flex gap-4 flex-col">
                <div className="text-primary-500 font-bold text-6xl uppercase">{t("registrationClosed")}</div>
                <div className="text-primary-500 font-bold text-3xl uppercase">{t("seeYouSoon")}</div>
            </div>
        );
    }

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        const payload = {
            teamName: data.teamName,
            league: data.league,
            language: data.language,
            leaderName: data.leaderName,
            leaderEmail: data.leaderEmail,
            leaderPhone: formatPhoneNumber(data.leaderPhone as string),
            leaderCountry: data.leaderCountry,
            leaderCity: data.leaderCity,
            captainName: data.captainName,
            captainSchool: data.captainSchool,
            captainGrade: parseInt(data.captainGrade as string),
            captainEmail: data.captainEmail,
            captainPhone: formatPhoneNumber(data.captainPhone as string),
            member1Name: data.member1Name,
            member1School: data.member1School,
            member1Grade: parseInt(data.member1Grade as string),
            member1Email: data.member1Email,
            member1Phone: formatPhoneNumber(data.member1Phone as string),
            member2Name: data.member2Name,
            member2School: data.member2School,
            member2Grade: parseInt(data.member2Grade as string),
            member2Email: data.member2Email,
            member2Phone: formatPhoneNumber(data.member2Phone as string),
            member3Name: showMember4 ? data.member3Name : null,
            member3School: showMember4 ? data.member3School : null,
            member3Grade: showMember4 ? parseInt(data.member3Grade as string) : null,
            member3Email: showMember4 ? data.member3Email : null,
            member3Phone: showMember4 ? formatPhoneNumber(data.member3Phone as string) : null,
            captainParent: { parentName: "", parentEmail: "", parentPhone: "", autoproctorConsent: false },
            member1Parent: { parentName: "", parentEmail: "", parentPhone: "", autoproctorConsent: false },
            member2Parent: { parentName: "", parentEmail: "", parentPhone: "", autoproctorConsent: false },
            member3Parent: { parentName: "", parentEmail: "", parentPhone: "", autoproctorConsent: false },
        };

        try {
            const response = await fetch('/api/form.json', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                setIsSubmitted(true);
            }
        } catch (err) {}
    };

    const parentFormUrl =
        lang === 'kz' ? '/kz/parent-consent'
        : lang === 'en' ? '/en/parent-consent'
        : '/parent-consent';

    if (isSubmitted) {
        return (
            <div className="max-w-3xl mx-auto p-8 bg-amber-50 border border-amber-200 rounded-2xl text-neutral-800 space-y-4 relative z-20">
                <h3 className="text-xl font-semibold text-amber-800">{t("success.title")}</h3>
                <p className="text-sm text-neutral-700">{t("success.body")}</p>
                <p className="text-sm text-neutral-500">{t("success.hint")}</p>
                <a href={parentFormUrl} className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2.5 px-5 rounded-lg transition-colors text-sm">
                    {t("success.link")}
                </a>
            </div>
        );
    }

    const inputCls = "w-full h-11 border border-neutral-200 rounded-lg px-3 text-sm bg-white text-neutral-900 outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all placeholder:text-neutral-400";
    const labelCls = "block text-xs font-medium text-neutral-500 mb-1.5 uppercase tracking-wide";
    const sectionTitle = "text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-4 pb-2 border-b border-neutral-100";

    const MemberBlock = ({
        title,
        badge,
        prefix,
        optional = false,
        extra,
    }: {
        title: string;
        badge?: string;
        prefix: string;
        optional?: boolean;
        extra?: React.ReactNode;
    }) => {
        const validateGrade = (e: React.ChangeEvent<HTMLInputElement>) => {
            const val = parseInt(e.target.value);
            if (league === 'junior' && val > 9) {
                e.target.setCustomValidity(t("grade.errorJunior"));
            } else if (val < 1) {
                e.target.setCustomValidity(t("grade.errorMin"));
            } else {
                e.target.setCustomValidity('');
            }
        };

        return (
            <div className="border border-neutral-100 rounded-xl p-5 space-y-4">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-neutral-800">{title}</span>
                    {badge && (
                        <span className="text-xs bg-neutral-100 text-neutral-500 rounded-full px-2.5 py-0.5 font-medium">{badge}</span>
                    )}
                    {extra}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                        <label className={labelCls}>{t(`${prefix}Name` as any)} {!optional && <span className="text-red-400">*</span>}</label>
                        <input
                            name={`${prefix}Name`}
                            type="text"
                            required={!optional}
                            className={inputCls}
                            placeholder="Равил Чебурек"
                        />
                    </div>
                    <div>
                        <label className={labelCls}>{t(`${prefix}School` as any)} {!optional && <span className="text-red-400">*</span>}</label>
                        <input
                            name={`${prefix}School`}
                            type="text"
                            required={!optional}
                            className={inputCls}
                            placeholder={t(`${prefix}School` as any)}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                        <label className={labelCls}>
                            {t(`${prefix}Grade` as any)} {!optional && <span className="text-red-400">*</span>}
                            {league === 'junior' && (
                                <span className="ml-1 normal-case text-neutral-400">({t("grade.maxJunior")})</span>
                            )}
                        </label>
                        <input
                            name={`${prefix}Grade`}
                            type="number"
                            min="1"
                            max={league === 'junior' ? 9 : 12}
                            required={!optional}
                            onChange={validateGrade}
                            onInput={validateGrade}
                            className={inputCls}
                            placeholder={league === 'junior' ? '1–9' : '1–12'}
                        />
                    </div>
                    <div>
                        <label className={labelCls}>{t(`${prefix}Email` as any)} {!optional && <span className="text-red-400">*</span>}</label>
                        <input
                            name={`${prefix}Email`}
                            type="email"
                            required={!optional}
                            className={inputCls}
                            placeholder="email@example.com"
                        />
                    </div>
                    <div>
                        <label className={labelCls}>{t(`${prefix}Phone` as any)} {!optional && <span className="text-red-400">*</span>}</label>
                        <input
                            name={`${prefix}Phone`}
                            type="text"
                            required={!optional}
                            className={inputCls}
                            placeholder="+7 (700) 000-00-00"
                        />
                    </div>
                </div>
            </div>
        );
    };

    return (
        <form onSubmit={handleFormSubmit} className="max-w-3xl mx-auto space-y-8 text-neutral-800 bg-white relative z-20">

            <div className="space-y-4">
                <p className={sectionTitle}>{t("section.basicInfo")}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                        <label className={labelCls}>{t("team.name")} <span className="text-red-400">*</span></label>
                        <input name="teamName" type="text" required className={inputCls} placeholder="Введите название" />
                    </div>
                    <div>
                        <label className={labelCls}>{t("league.label")} <span className="text-red-400">*</span></label>
                        <select
                            name="league"
                            value={league}
                            onChange={(e) => setLeague(e.target.value)}
                            className={inputCls}
                        >
                            <option value="junior">{t("league.junior")} (Junior)</option>
                            <option value="senior">{t("league.senior")} (Senior)</option>
                        </select>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                        <label className={labelCls}>{t("language.label")} <span className="text-red-400">*</span></label>
                        <select name="language" className={inputCls}>
                            <option value="ru">{t("language.ru")}</option>
                            <option value="kz">{t("language.kz")}</option>
                        </select>
                        <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">
                            {t("languageRequirement")}
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-neutral-50 border border-neutral-100 rounded-xl p-5 space-y-4">
                <p className={sectionTitle}>{t("sectionLeader")}</p>

                <p className="text-xs text-neutral-600 leading-relaxed bg-white p-3 rounded-lg border border-neutral-200">
                    {t("leaderInfo")}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                        <label className={labelCls}>{t("leaderName")} <span className="text-red-400">*</span></label>
                        <input name="leaderName" type="text" required className={inputCls} placeholder="Максим Альфедо" />
                    </div>
                    <div>
                        <label className={labelCls}>{t("leaderEmail")} <span className="text-red-400">*</span></label>
                        <input name="leaderEmail" type="email" required className={inputCls} placeholder="email@example.com" />
                    </div>
                    <div>
                        <label className={labelCls}>{t("leaderPhone")} <span className="text-red-400">*</span></label>
                        <input name="leaderPhone" type="text" required className={inputCls} placeholder="+7 (700) 000-00-00" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                        <label className={labelCls}>{t("leaderCountry")} <span className="text-red-400">*</span></label>
                        <input name="leaderCountry" type="text" required className={inputCls} placeholder="Казахстан" />
                    </div>
                    <div>
                        <label className={labelCls}>{t("leaderCity")} <span className="text-red-400">*</span></label>
                        <input name="leaderCity" type="text" required className={inputCls} placeholder="Алматы" />
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                <p className={sectionTitle}>{t("section.participants")}</p>

                <MemberBlock title={t("sectionCaptain")} badge={t("badge.required")} prefix="captain" />
                <MemberBlock title={t("sectionMember1")} badge={t("badge.required")} prefix="member1" />
                <MemberBlock title={t("sectionMember2")} badge={t("badge.required")} prefix="member2" />

                {!showMember4 ? (
                    <button
                        type="button"
                        onClick={() => setShowMember4(true)}
                        className="w-full border border-dashed border-neutral-200 rounded-xl py-3 text-sm text-neutral-400 hover:border-neutral-300 hover:text-neutral-600 transition-colors flex items-center justify-center gap-1.5"
                    >
                        <span className="text-lg leading-none">+</span> {t("addMember4")}
                    </button>
                ) : (
                    <MemberBlock
                        title={t("sectionMember3")}
                        badge={t("badge.optional")}
                        prefix="member3"
                        optional
                        extra={
                            <button
                                type="button"
                                onClick={() => setShowMember4(false)}
                                className="ml-auto text-xs text-red-400 hover:text-red-600 transition-colors"
                            >
                                {t("removeMember")}
                            </button>
                        }
                    />
                )}
            </div>

            <label className="flex items-start gap-3 cursor-pointer p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                <input type="checkbox" required className="mt-0.5 w-4 h-4 accent-[#172967] flex-shrink-0" />
                <span className="text-xs text-neutral-500 leading-relaxed">
                    <span dangerouslySetInnerHTML={{ __html: t("rulesAcknowledgement") }} />
                    {" "}<span className="text-red-400">*</span>
                </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                <input type="checkbox" required className="mt-0.5 w-4 h-4 accent-[#172967] flex-shrink-0" />
                <span className="text-xs text-neutral-500 leading-relaxed">
                    <span dangerouslySetInnerHTML={{ __html: t("personalData") }} />
                    {" "}<span className="text-red-400">*</span>
                </span>
            </label>

            <button
                type="submit"
                className="w-full h-12 bg-[#172967] hover:bg-[#0f1c4a] text-white rounded-xl text-sm font-semibold transition-colors"
            >
                {t("register.team")}
            </button>
        </form>
    );
}