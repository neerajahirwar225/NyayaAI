import React, { useState } from 'react';
import { ShieldCheck, Scale, HeartHandshake, BookOpen, Smartphone } from 'lucide-react';

const RightsAwareness = () => {
  const [activeTab, setActiveTab] = useState('Consumer Rights');

  const categories = [
    {
      name: 'Consumer Rights',
      icon: HeartHandshake,
      title: 'Consumer Protection Act, 2019',
      rights: [
        {
          title: 'Right to Safety (सुरक्षा का अधिकार)',
          desc: 'Protection against goods and services that are hazardous to life and property.'
        },
        {
          title: 'Right to Information (सूचना का अधिकार)',
          desc: 'Right to be informed about quality, quantity, purity, standard, and price of goods to make informed choices.'
        },
        {
          title: 'Right to Choose (चुनने का अधिकार)',
          desc: 'Assurance of access to a variety of goods and services at competitive prices.'
        },
        {
          title: 'Right to seek Redressal (क्षतिपूर्ति का अधिकार)',
          desc: 'Right to seek redressal against unfair trade practices or exploitation.'
        }
      ],
      process: 'Filing complaints: You can file consumer disputes online at the E-Daakhil portal or district forums for claims up to Rs. 50 Lakhs.'
    },
    {
      name: 'Employee Rights',
      icon: Scale,
      title: 'Labour Laws in India',
      rights: [
        {
          title: 'Notice Period (नोटिस अवधि)',
          desc: 'Employers cannot terminate permanent employees without a specified notice period (typically 30-90 days) or salary in lieu of notice, except for gross misconduct.'
        },
        {
          title: 'Maternity Benefit Act (मातृत्व लाभ)',
          desc: 'Women employees are entitled to 26 weeks of paid maternity leave in establishments with 10 or more workers.'
        },
        {
          title: 'Equal Remuneration (समान पारिश्रमिक)',
          desc: 'Right to equal pay for equal work for male and female employees alike, under the Equal Remuneration Act.'
        },
        {
          title: 'Working Hours (काम के घंटे)',
          desc: 'Standard working limit is 48 hours a week (9 hours/day), beyond which overtime compensation is mandatory.'
        }
      ],
      process: 'Grievance lodging: Approach the Labour Commissioner office or local Labour Court under the Industrial Disputes Act.'
    },
    {
      name: 'Tenant Rights',
      icon: BookOpen,
      title: 'Model Tenancy Act / Rent Control',
      rights: [
        {
          title: 'Protection from Eviction (मनमानी बेदखली से सुरक्षा)',
          desc: 'Landlords cannot evict tenants without a valid court order or mutual agreement, even after lease expiration.'
        },
        {
          title: 'Security Deposit Limits (सुरक्षा जमा सीमा)',
          desc: 'Under the Model Tenancy Act, security deposits are capped at maximum 2 months rent for residential properties.'
        },
        {
          title: 'Essential Services (आवश्यक सेवाएं)',
          desc: 'Landlords cannot cut off water, electricity, or maintenance utilities under any dispute scenario.'
        },
        {
          title: 'Rent Increment (किराया वृद्धि सीमा)',
          desc: 'Rent increases must comply with state rent control acts or as mutually signed in the written rent agreement.'
        }
      ],
      process: 'Dispute resolution: Approach the Rent Authority or Rent Tribunal established in your state.'
    },
    {
      name: 'Women Rights',
      icon: ShieldCheck,
      title: 'Constitutional & Special Protection',
      rights: [
        {
          title: 'Right to Equal Share (उत्तराधिकार अधिकार)',
          desc: 'Daughters have equal coparcenary rights in ancestral property as sons under the Hindu Succession (Amendment) Act, 2005.'
        },
        {
          title: 'Zero FIR Protection (जीरो एफआईआर)',
          desc: 'A woman can file a complaint/FIR at any police station regardless of the place of incidence; the police must register and forward it.'
        },
        {
          title: 'Protection from Domestic Violence (घरेलू हिंसा से सुरक्षा)',
          desc: 'The Domestic Violence Act, 2005 provides women with civil protection, residence orders, and monetary relief against abuse.'
        },
        {
          title: 'POSH Act Rights (कार्यस्थल पर यौन उत्पीड़न)',
          desc: 'Mandatory Internal Complaints Committee (ICC) in every office with 10+ employees to address workplace harassment.'
        }
      ],
      process: 'Helplines: Call 1091 (Women Helpline) or 181 for immediate legal assistance and counseling.'
    },
    {
      name: 'Cybercrime Rights',
      icon: Smartphone,
      title: 'Information Technology Act, 2000',
      rights: [
        {
          title: 'Online Identity Theft (पहचान चोरी)',
          desc: 'Section 66C penalizes identity theft, including fake social media profiles or email spoofing, with up to 3 years imprisonment.'
        },
        {
          title: 'Cyber Bullying & Stalking (साइबर बुलिंग)',
          desc: 'Sections 354D and 66E safeguard individuals against online tracking, video recording, or distribution of private images without consent.'
        },
        {
          title: 'Financial Phishing (वित्तीय धोखाधड़ी)',
          desc: 'Section 66D covers cheating by personation using computer resources. Victims have a right to immediate bank account freeze requests.'
        }
      ],
      process: 'Filing: Report online cyber financial frauds at cybercrime.gov.in or call national helpline 1930.'
    }
  ];

  const currentCategory = categories.find(c => c.name === activeTab);
  const TabIcon = currentCategory.icon;

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-xl font-bold text-white font-mono">Bilingual Rights Awareness</h2>
        <p className="text-xs text-brand-textMuted mt-1">Know your constitutional and statutory rights under Indian law</p>
      </div>

      {/* Categories Tabs */}
      <div className="flex flex-wrap gap-3">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.name}
              onClick={() => setActiveTab(cat.name)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                activeTab === cat.name
                  ? 'bg-brand-accent/20 border-brand-accent text-white'
                  : 'bg-white/5 border-white/5 text-brand-textMuted hover:text-white hover:border-white/10'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* Active category details */}
      <div className="glass p-6 rounded-2xl border border-white/5 space-y-6">
        <div className="flex items-center gap-3 border-b border-white/5 pb-4">
          <TabIcon className="h-7 w-7 text-indigo-400" />
          <div>
            <h3 className="text-base font-semibold text-white">{currentCategory.name}</h3>
            <p className="text-xs text-brand-textMuted">{currentCategory.title}</p>
          </div>
        </div>

        {/* Rights lists */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentCategory.rights.map((right, idx) => (
            <div key={idx} className="p-4 bg-white/5 border border-white/5 rounded-xl space-y-2">
              <h4 className="text-sm font-bold text-indigo-300">{right.title}</h4>
              <p className="text-xs text-brand-textMuted leading-relaxed">{right.desc}</p>
            </div>
          ))}
        </div>

        {/* Filing guide */}
        <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl space-y-2">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">How to Seek Remedies / शिकायत कैसे दर्ज करें?</h4>
          <p className="text-xs text-brand-text leading-relaxed">{currentCategory.process}</p>
        </div>
      </div>
    </div>
  );
};

export default RightsAwareness;
