import React, { useState } from 'react';
import './FAQPage.css';

function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      category: 'Getting Started',
      icon: '🚀',
      questions: [
        {
          q: 'How do I start earning cryptocurrency?',
          a: 'Simply register for a free account, complete your profile, and start playing our games. Each game you play earns you points that can be converted to real cryptocurrency like TON, CATI, and USDT.'
        },
        {
          q: 'Is registration really free?',
          a: 'Yes! Registration is 100% free with no hidden fees. You can start earning immediately after creating your account.'
        },
        {
          q: 'What cryptocurrencies can I earn?',
          a: 'You can earn TON (The Open Network), CATI (Catizen), and USDT (Tether). Convert your points to any of these cryptocurrencies.'
        }
      ]
    },
    {
      category: 'Earning & Points',
      icon: '💎',
      questions: [
        {
          q: 'How do I earn points?',
          a: 'Earn points by playing games, completing daily tasks, maintaining login streaks, referring friends, and participating in special events. Different activities award different point amounts.'
        },
        {
          q: 'What is the conversion rate?',
          a: 'The current conversion rate is 10,000 points = 1 CATI. Rates may vary for other cryptocurrencies and are displayed in the conversion page.'
        },
        {
          q: 'How many times can I play games per day?',
          a: 'Each game has a cooldown period. Most games can be played 2-5 times per day. VIP members get additional plays and reduced cooldowns.'
        },
        {
          q: 'What are VIP levels?',
          a: 'VIP levels are earned through experience points (EXP). Higher VIP levels unlock better rewards, reduced cooldowns, exclusive games, and higher conversion rates.'
        }
      ]
    },
    {
      category: 'Withdrawals',
      icon: '💰',
      questions: [
        {
          q: 'How do I withdraw my earnings?',
          a: 'Go to the Conversion page, convert your points to cryptocurrency, then request a withdrawal. Enter your wallet address and the amount you wish to withdraw.'
        },
        {
          q: 'What is the minimum withdrawal amount?',
          a: 'The minimum withdrawal is 100 CATI or equivalent in other cryptocurrencies. This ensures transaction fees don\'t eat into your earnings.'
        },
        {
          q: 'How long do withdrawals take?',
          a: 'Withdrawals are processed within 24-48 hours. You\'ll receive an email notification when your withdrawal is approved and sent to your wallet.'
        },
        {
          q: 'Are there any withdrawal fees?',
          a: 'Yes, there\'s a small network fee of 0.5 CATI (or equivalent) to cover blockchain transaction costs. This is deducted from your withdrawal amount.'
        }
      ]
    },
    {
      category: 'Games & Activities',
      icon: '🎮',
      questions: [
        {
          q: 'What games are available?',
          a: 'We offer Puzzle Challenge, Spin Wheel, Memory Match, Video Mining, and Sticker Packs. New games are added regularly based on user feedback.'
        },
        {
          q: 'Do I need to download anything?',
          a: 'No! All games are browser-based and play directly on our website. No downloads or installations required.'
        },
        {
          q: 'Can I play on mobile?',
          a: 'Yes! Our platform is fully responsive and works on all devices - desktop, tablet, and mobile phones.'
        }
      ]
    },
    {
      category: 'Referrals & Bonuses',
      icon: '🎁',
      questions: [
        {
          q: 'How does the referral program work?',
          a: 'Share your unique referral link with friends. When they register and start earning, you receive 10% of their points as a bonus. There\'s no limit to how many people you can refer!'
        },
        {
          q: 'What are daily bonuses?',
          a: 'Login daily to claim free points and maintain your streak. Longer streaks earn bigger bonuses. Don\'t break your streak!'
        },
        {
          q: 'Are there special events?',
          a: 'Yes! We regularly host special events, tournaments, and challenges with bonus rewards. Follow our announcements to participate.'
        }
      ]
    },
    {
      category: 'Account & Security',
      icon: '🔒',
      questions: [
        {
          q: 'Is my account secure?',
          a: 'Yes! We use industry-standard encryption, secure authentication, and regular security audits. Your data and earnings are protected.'
        },
        {
          q: 'Can I change my username or email?',
          a: 'Yes, you can update your profile information anytime from the Profile Edit page. Some changes may require verification.'
        },
        {
          q: 'What if I forget my password?',
          a: 'Click "Forgot Password" on the login page. We\'ll send a reset link to your registered email address.'
        },
        {
          q: 'Can I have multiple accounts?',
          a: 'No, each person is allowed only one account. Multiple accounts may result in suspension and loss of earnings.'
        }
      ]
    },
    {
      category: 'Technical Support',
      icon: '🛠️',
      questions: [
        {
          q: 'What browsers are supported?',
          a: 'We support all modern browsers including Chrome, Firefox, Safari, Edge, and Opera. For best experience, keep your browser updated.'
        },
        {
          q: 'I\'m having technical issues, what should I do?',
          a: 'Try refreshing the page, clearing your browser cache, or using a different browser. If issues persist, contact our support team.'
        },
        {
          q: 'How do I contact support?',
          a: 'Visit the Benefits page and click "Contact Support" or email us at support@cryptoearning.com. We respond within 24 hours.'
        }
      ]
    }
  ];

  const toggleFAQ = (categoryIndex, questionIndex) => {
    const index = `${categoryIndex}-${questionIndex}`;
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-page">
      <div className="faq-header">
        <h1>❓ Frequently Asked Questions</h1>
        <p>Find answers to common questions about earning cryptocurrency</p>
      </div>

      <div className="faq-search">
        <input 
          type="text" 
          placeholder="🔍 Search for answers..." 
          className="search-input"
        />
      </div>

      <div className="faq-categories">
        {faqs.map((category, catIndex) => (
          <div key={catIndex} className="faq-category">
            <div className="category-header">
              <span className="category-icon">{category.icon}</span>
              <h2>{category.category}</h2>
              <span className="question-count">{category.questions.length} questions</span>
            </div>

            <div className="faq-list">
              {category.questions.map((faq, qIndex) => {
                const index = `${catIndex}-${qIndex}`;
                const isOpen = openIndex === index;

                return (
                  <div 
                    key={qIndex} 
                    className={`faq-item ${isOpen ? 'open' : ''}`}
                  >
                    <button 
                      className="faq-question"
                      onClick={() => toggleFAQ(catIndex, qIndex)}
                    >
                      <span className="question-text">{faq.q}</span>
                      <span className="toggle-icon">{isOpen ? '−' : '+'}</span>
                    </button>
                    
                    {isOpen && (
                      <div className="faq-answer">
                        <p>{faq.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="faq-footer">
        <div className="still-have-questions">
          <h3>Still have questions?</h3>
          <p>Can't find what you're looking for? Our support team is here to help!</p>
          <div className="contact-options">
            <button className="contact-btn email">
              📧 Email Support
            </button>
            <button className="contact-btn chat">
              💬 Live Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FAQPage;
