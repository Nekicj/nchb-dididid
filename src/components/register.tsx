import React, { useState } from 'react';

export function RegisterForm({ lang }: { lang: any }) {
    const [hasLeader, setHasLeader] = useState('yes');
    const [showMember4, setShowMember4] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const teamData = Object.fromEntries(formData.entries());
        
        console.log("Данные команды сохранены в Neon DB:", teamData);
        
        setIsSubmitted(true);
    };

    const parentFormUrl = lang === 'kz' ? '/kz/parent-consent' : lang === 'en' ? '/en/parent-consent' : '/parent-consent';

    if (isSubmitted) {
        return (
            <div className="max-w-3xl mx-auto p-8 bg-amber-50 border-2 border-amber-300 rounded-xl shadow-md text-neutral-800 space-y-4 animate-fade-in">
                {lang === 'kz' ? (
                    <>
                        <h3 className="text-2xl font-bold text-amber-800">⚠️ Команда тіркелді, бірақ бұл әлі бәрі емес!</h3>
                        <p className="text-base font-medium">
                            Тіркеуді толық аяқтау үшін **әрбір қатысушының ата-анасы немесе заңды өкілі** AutoProctor жүйесін пайдалануға міндетті түрде келісім беруі керек.
                        </p>
                        <p className="text-sm text-neutral-600">
                            Ата-анаңызға мына сілтемені жіберіңіз және олар пішінде сіздің телефон нөміріңізді немесе email-ыңызды көрсетуі керек екенін ескертіңіз:
                        </p>
                        <div className="pt-2">
                            <a href={parentFormUrl} className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded-lg shadow transition-colors text-center w-full sm:w-auto">
                                Ата-ана келісімінің сілтемесі ➔
                            </a>
                        </div>
                    </>
                ) : lang === 'en' ? (
                    <>
                        <h3 className="text-2xl font-bold text-amber-800">⚠️ Team registered, but action is required!</h3>
                        <p className="text-base font-medium">
                            To fully complete your registration, **the parent or legal representative of each participant** MUST submit a separate consent form for AutoProctor.
                        </p>
                        <p className="text-sm text-neutral-600">
                            Please send this link to your parents and remind them to enter YOUR phone number or email so the system can link your profiles:
                        </p>
                        <div className="pt-2">
                            <a href={parentFormUrl} className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded-lg shadow transition-colors text-center w-full sm:w-auto">
                                Parent Consent Form Link ➔
                            </a>
                        </div>
                    </>
                ) : (
                    <>
                        <h3 className="text-2xl font-bold text-amber-800">⚠️ Команда зарегистрирована, но это ещё не всё!</h3>
                        <p className="text-base font-medium">
                            Чтобы полностью завершить регистрацию, **родитель или законный представитель каждого участника** ОБЯЗАТЕЛЬНО должен пройти регистрацию в отдельной форме и дать согласие на AutoProctor.
                        </p>
                        <p className="text-sm text-neutral-600">
                            Перешлите эту ссылку своим родителям прямо сейчас и напомните им указать в форме ИМЕННО ВАШ номер телефона или email, чтобы база данных смогла связать ваши анкеты:
                        </p>
                        <div className="pt-2">
                            <a href={parentFormUrl} className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded-lg shadow transition-colors text-center w-full sm:w-auto">
                                Перейти к форме родительского согласия ➔
                            </a>
                        </div>
                    </>
                )}
            </div>
        );
    }

    return (
        <form onSubmit={handleFormSubmit} className="space-y-8 max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md border border-neutral-100 text-neutral-800">
            
            <div className="space-y-4">
                <h3 className="text-lg font-bold text-primary-900 border-b pb-1">Основная информация о команде</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-semibold mb-1">Название команды *</label>
                        <input name="teamName" type="text" required className="w-full border p-2 rounded-lg" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Лига *</label>
                        <select name="league" className="w-full border p-2 rounded-lg bg-white">
                            <option value="junior">Юниоры (Junior)</option>
                            <option value="senior">Сениоры (Senior)</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-semibold mb-1">Язык участия *</label>
                        <select name="language" className="w-full border p-2 rounded-lg bg-white">
                            <option value="ru">Русский</option>
                            <option value="kz">Казахский</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Наличие руководителя *</label>
                        <select 
                            name="hasLeader" 
                            value={hasLeader} 
                            onChange={(e) => setHasLeader(e.target.value)} 
                            className="w-full border p-2 rounded-lg bg-white"
                        >
                            <option value="yes">Да</option>
                            <option value="no">Нет</option>
                        </select>
                    </div>
                </div>
            </div>

            {hasLeader === 'yes' && (
                <div className="space-y-4 p-4 bg-neutral-50 rounded-xl border border-neutral-200">
                    <h3 className="text-md font-bold text-neutral-800">Данные руководителя команды</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-xs font-semibold mb-1">ФИО Руководителя *</label>
                            <input name="leaderName" type="text" required={hasLeader === 'yes'} className="w-full border p-2 rounded-lg bg-white" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold mb-1">Email руководителя *</label>
                            <input name="leaderEmail" type="email" required={hasLeader === 'yes'} className="w-full border p-2 rounded-lg bg-white" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold mb-1">Telephone руководителя *</label>
                            <input name="leaderPhone" type="text" required={hasLeader === 'yes'} className="w-full border p-2 rounded-lg bg-white" />
                        </div>
                    </div>
                </div>
            )}

            <div className="space-y-4">
                <h3 className="text-lg font-bold text-primary-900 border-b pb-1">Капитан команды</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-semibold mb-1">ФИО Капитана *</label>
                        <input name="captainName" type="text" required className="w-full border p-2 rounded-lg" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Школа *</label>
                        <input name="captainSchool" type="text" required className="w-full border p-2 rounded-lg" />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-xs font-semibold mb-1">Класс *</label>
                        <input name="captainGrade" type="text" required className="w-full border p-2 rounded-lg" placeholder="Например: 11" />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold mb-1">Email *</label>
                        <input name="captainEmail" type="email" required className="w-full border p-2 rounded-lg" />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold mb-1">Телефон *</label>
                        <input name="captainPhone" type="text" required className="w-full border p-2 rounded-lg" />
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-bold text-primary-900 border-b pb-1">Участник 2</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-semibold mb-1">ФИО Участника 2 *</label>
                        <input name="member1Name" type="text" required className="w-full border p-2 rounded-lg" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Школа Участника 2 *</label>
                        <input name="member1School" type="text" required className="w-full border p-2 rounded-lg" />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-xs font-semibold mb-1">Класс *</label>
                        <input name="member1Grade" type="text" required className="w-full border p-2 rounded-lg" />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold mb-1">Email *</label>
                        <input name="member1Email" type="email" required className="w-full border p-2 rounded-lg" />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold mb-1">Телефон *</label>
                        <input name="member1Phone" type="text" required className="w-full border p-2 rounded-lg" />
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-bold text-primary-900 border-b pb-1">Участник 3</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-semibold mb-1">ФИО Участника 3 *</label>
                        <input name="member2Name" type="text" required className="w-full border p-2 rounded-lg" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Школа Участника 3 *</label>
                        <input name="member2School" type="text" required className="w-full border p-2 rounded-lg" />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-xs font-semibold mb-1">Класс *</label>
                        <input name="member2Grade" type="text" required className="w-full border p-2 rounded-lg" />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold mb-1">Email *</label>
                        <input name="member2Email" type="email" required className="w-full border p-2 rounded-lg" />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold mb-1">Телефон *</label>
                        <input name="member2Phone" type="text" required className="w-full border p-2 rounded-lg" />
                    </div>
                </div>
            </div>

            {!showMember4 ? (
                <button 
                    type="button" 
                    onClick={() => setShowMember4(true)}
                    className="text-primary-700 font-semibold hover:underline flex items-center gap-1"
                >
                    + Добавить участника 4
                </button>
            ) : (
                <div className="space-y-4 p-4 bg-neutral-50 rounded-xl border border-neutral-200 relative">
                    <button 
                        type="button" 
                        onClick={() => setShowMember4(false)} 
                        className="absolute top-2 right-4 text-sm text-red-500 hover:underline"
                    >
                        Удалить
                    </button>
                    <h3 className="text-lg font-bold text-neutral-800">Участник 4 (необязательно)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold mb-1">ФИО Участника 4</label>
                            <input name="member3Name" type="text" className="w-full border p-2 rounded-lg bg-white" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-1">Школа Участника 4</label>
                            <input name="member3School" type="text" className="w-full border p-2 rounded-lg bg-white" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-xs font-semibold mb-1">Класс</label>
                            <input name="member3Grade" type="text" className="w-full border p-2 rounded-lg bg-white" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold mb-1">Email</label>
                            <input name="member3Email" type="email" className="w-full border p-2 rounded-lg bg-white" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold mb-1">Телефон</label>
                            <input name="member3Phone" type="text" className="w-full border p-2 rounded-lg bg-white" />
                        </div>
                    </div>
                </div>
            )}

            <div className="pt-4 border-t">
                <label className="flex items-start gap-2 cursor-pointer">
                    <input type="checkbox" required className="mt-1" />
                    <span className="text-xs text-neutral-600">
                        Заполняя форму, члены команды подтверждают, что ознакомлены с основным регламентом научных боев. *
                    </span>
                </label>
            </div>

            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-bold transition-colors">
                Зарегистрировать команду
            </button>
        </form>
    );
}