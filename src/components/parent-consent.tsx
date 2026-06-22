import React, { useState } from 'react';

export function ParentConsentForm({ lang }: { lang: any }) {
    const [isRepresentative, setIsRepresentative] = useState(false);
    const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const texts = {
        kz: {
            title: "Ата-ананың келісім пішіні",
            subtitle: "Әрбір қатысушы үшін ата-анасы немесе заңды өкілі жеке толтырады.",
            identifierLabel: "Қатысушының телефон нөмірі немесе Email-ы *",
            identifierHint: "Тіркелу кезінде балаңыз көрсеткен телефонды немесе email-ды енгізіңіз. Бұл деректерді базада байланыстыру үшін қажет.",
            nameLabel: "Өкілдің Т.Ә.Ғ. *",
            emailLabel: "Өкілдің Email-ы *",
            phoneLabel: "Өкілдің телефоны *",
            phonePlaceholder: "+7 (707) 123-4567",
            repCheckboxTitle: "Мен сенімді тұлғамын",
            repCheckboxHint: "Егер сіз нотариалды сенімхат бойынша ілесіп жүруші/мұғалім болсаңыз, құсбелгіні қойыңыз",
            poaLabel: "Нотариалды сенімхаттың нөмірі *",
            poaPlaceholder: "Мысалы, №12345-XYZ",
            consent1: "Мен баламның AutoProctor жүйесін пайдалануына және онымен байланысты дербес деректерді өңдеуге келісімімді растаймын. *",
            consent2: "Турнир регламентіне сәйкес менің дербес деректерімді жинауға, өңдеуге және сақтауға келісім беремін. *",
            submitBtn: "Келісімді жіберу",
            success: "Келісім сәтті жіберілді және қатысушымен байланыстырылды!",
            error: "Жіберу кезінде қате кетті. Кейінірек қайталап көріңіз."
        },
        en: {
            title: "Parental Consent Form",
            subtitle: "To be filled out individually by a parent or legal representative for each participant.",
            identifierLabel: "Participant's Phone Number or Email *",
            identifierHint: "Enter the exact phone or email your child used during team registration. Required to link data in the database.",
            nameLabel: "Representative's Full Name *",
            emailLabel: "Representative's Email *",
            phoneLabel: "Representative's Phone *",
            phonePlaceholder: "+1 (555) 123-4567",
            repCheckboxTitle: "I am an authorized representative",
            repCheckboxHint: "Check this box if you are an accompanying teacher/guardian with a power of attorney",
            poaLabel: "Power of Attorney (PoA) Number *",
            poaPlaceholder: "e.g., No.12345-XYZ",
            consent1: "I confirm my consent to the use of the AutoProctor system and the processing of related personal data of my child. *",
            consent2: "I consent to the collection, processing, and storage of my personal data in accordance with the tournament regulations. *",
            submitBtn: "Submit Consent",
            success: "Consent successfully submitted and linked to the participant!",
            error: "An error occurred during submission. Please try again later."
        },
        ru: {
            title: "Форма родительского согласия",
            subtitle: "Заполняется родителем или законным представителем индивидуально для каждого участника.",
            identifierLabel: "Номер телефона или Email участника *",
            identifierHint: "Укажите именно тот телефон или email, который ребенок ввел при регистрации команды. Это нужно для связывания данных в базе.",
            nameLabel: "ФИО представителя *",
            emailLabel: "Email представителя *",
            phoneLabel: "Телефон представителя *",
            phonePlaceholder: "+7 (707) 123-4567",
            repCheckboxTitle: "Я являюсь доверенным лицом",
            repCheckboxHint: "Поставьте галочку, если вы сопровождающий/учитель по нотариальной доверенности",
            poaLabel: "Номер нотариальной доверенности *",
            poaPlaceholder: "Например, №12345-XYZ",
            consent1: "Я подтверждаю согласие на использование системы AutoProctor и обработку связанных с этим персональных данных моего подопечного. *",
            consent2: "Даю согласие на сбор, обработку и хранение моих персональных данных в соответствии с регламентом турнира. *",
            submitBtn: "Отправить согласие",
            success: "Согласие успешно отправлено и связано с участником!",
            error: "Ошибка при отправке. Пожалуйста, попробуйте позже."
        }
    };

    const t = texts[lang as keyof typeof texts] || texts.ru;

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatusMessage(null);
        
        const formData = new FormData(e.currentTarget);
        const data = {
            childIdentifier: formData.get('childIdentifier'),
            parentName: formData.get('parentName'),
            parentEmail: formData.get('parentEmail'),
            parentPhone: formData.get('parentPhone'),
            isRepresentative: isRepresentative,
            poaNumber: isRepresentative ? formData.get('poaNumber') : null,
            lang: lang
        };

        try {
            setStatusMessage({ type: 'success', text: t.success });
            e.currentTarget.reset();
            setIsRepresentative(false);
        } catch (error) {
            setStatusMessage({ type: 'error', text: t.error });
        }
    };

    return (
        <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md border border-neutral-100 text-neutral-800">
            <h2 className="text-2xl font-bold mb-1 text-primary-900">{t.title}</h2>
            <p className="text-sm text-neutral-500 mb-6">{t.subtitle}</p>

            {statusMessage && (
                <div className={`p-4 mb-4 rounded-lg text-sm font-medium ${
                    statusMessage.type === 'success' 
                        ? 'bg-green-50 text-green-700 border border-green-200' 
                        : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                    {statusMessage.text}
                </div>
            )}

            <form onSubmit={onSubmit} className="space-y-5">
                
                <div>
                    <label className="block text-sm font-semibold mb-1 text-neutral-700">
                        {t.identifierLabel}
                    </label>
                    <input 
                        name="childIdentifier" 
                        type="text" 
                        required 
                        className="w-full border border-neutral-300 p-2.5 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none transition-all" 
                        placeholder="За кого регистрируетесь" 
                    />
                    <p className="text-xs text-neutral-400 mt-1">{t.identifierHint}</p>
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-1 text-neutral-700">{t.nameLabel}</label>
                    <input name="parentName" type="text" required className="w-full border border-neutral-300 p-2.5 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-semibold mb-1 text-neutral-700">{t.emailLabel}</label>
                        <input name="parentEmail" type="email" required className="w-full border border-neutral-300 p-2.5 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-1 text-neutral-700">{t.phoneLabel}</label>
                        <input name="parentPhone" type="text" required className="w-full border border-neutral-300 p-2.5 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" placeholder={t.phonePlaceholder} />
                    </div>
                </div>

                <label className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg border border-neutral-200 cursor-pointer select-none">
                    <input 
                        type="checkbox" 
                        checked={isRepresentative} 
                        onChange={(e) => setIsRepresentative(e.target.checked)} 
                        className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                    />
                    <div className="text-sm">
                        <p className="font-semibold text-neutral-800">{t.repCheckboxTitle}</p>
                        <p className="text-xs text-neutral-500">{t.repCheckboxHint}</p>
                    </div>
                </label>

                {isRepresentative && (
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg animate-fade-in">
                        <label className="block text-sm font-semibold text-blue-900 mb-1">{t.poaLabel}</label>
                        <input 
                            name="poaNumber" 
                            type="text" 
                            required={isRepresentative} 
                            className="w-full border border-blue-300 p-2.5 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none text-neutral-800" 
                            placeholder={t.poaPlaceholder} 
                        />
                    </div>
                )}

                <div className="space-y-3 pt-2">
                    <label className="flex items-start gap-2.5 cursor-pointer">
                        <input type="checkbox" required className="mt-1" />
                        <span className="text-xs text-neutral-600">{t.consent1}</span>
                    </label>
                    <label className="flex items-start gap-2.5 cursor-pointer">
                        <input type="checkbox" required className="mt-1" />
                        <span className="text-xs text-neutral-600">{t.consent2}</span>
                    </label>
                </div>

                <button type="submit" className="w-full bg-primary-700 hover:bg-primary-800 text-white p-3 rounded-lg font-bold transition-colors shadow">
                    {t.submitBtn}
                </button>
            </form>
        </div>
    );
}