import React, { useEffect, useState } from 'react';
import trafficTracker from '../utils/trafficTracker';
import './AdBanner.css';

function AdBanner({ size = 'banner', position = 'top', dismissible = false }) {
  const [visible, setVisible] = useState(true);
  const [adContent, setAdContent] = useState(null);

  useEffect(() => {
    // Track ad impression when component mounts
    trafficTracker.trackAdImpression();
    
    // Select random ad content
    setAdContent(getAdContent());
  }, [size]);

  const handleAdClick = () => {
    // Track ad click
    trafficTracker.onAdClick();
    
    // In a real implementation, this would redirect to advertiser's site
    // For demo purposes, we'll just show an alert
    alert('Ad clicked! This would redirect to advertiser site.');
  };

  const handleDismiss = (e) => {
    e.stopPropagation();
    setVisible(false);
  };

  const getAdContent = () => {
    const allAds = {
      banner: [
        {
          title: '🚀 Boost Your Crypto Earnings!',
          description: 'Join the #1 crypto trading platform with 0% fees',
          cta: 'Start Trading Now',
          gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        },
        {
          title: '💎 Premium Crypto Wallet',
          description: 'Secure your assets with military-grade encryption',
          cta: 'Get Wallet',
          gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
        },
        {
          title: '📈 Learn Crypto Trading',
          description: 'Free course: Master crypto trading in 30 days',
          cta: 'Start Learning',
          gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
        },
        {
          title: '🎁 Exclusive Airdrop Alert',
          description: 'Claim your free tokens before they run out',
          cta: 'Claim Now',
          gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
        }
      ],
      square: [
        {
          title: '💰 Earn More',
          description: 'Best crypto wallet with 5% APY',
          cta: 'Download App',
          gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
        },
        {
          title: '🔥 Hot Deal',
          description: 'Trade with zero fees',
          cta: 'Trade Now',
          gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)'
        }
      ],
      sidebar: [
        {
          title: '📊 Crypto News',
          description: 'Latest market updates',
          cta: 'Read More',
          gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
        },
        {
          title: '🎯 Pro Tips',
          description: 'Expert trading strategies',
          cta: 'Learn More',
          gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
        }
      ],
      native: [
        {
          title: '⚡ Lightning Fast Transactions',
          description: 'Experience instant crypto transfers with our new blockchain technology',
          cta: 'Try Now',
          gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        },
        {
          title: '🛡️ Maximum Security',
          description: 'Your crypto is protected by bank-level security measures',
          cta: 'Learn More',
          gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
        }
      ]
    };
    
    const adsForSize = allAds[size] || allAds.banner;
    return adsForSize[Math.floor(Math.random() * adsForSize.length)];
  };

  if (!visible) return null;
  if (!adContent) return null;

  return (
    <div 
      className={`ad-banner ad-${size} ad-${position}`} 
      onClick={handleAdClick}
      style={{ background: adContent.gradient }}
    >
      <div className="ad-content">
        <div className="ad-title">{adContent.title}</div>
        <div className="ad-description">{adContent.description}</div>
        <div className="ad-cta">{adContent.cta}</div>
      </div>
      <div className="ad-label">Sponsored</div>
      {dismissible && (
        <button className="ad-dismiss" onClick={handleDismiss} aria-label="Close ad">
          ✕
        </button>
      )}
    </div>
  );
}

export default AdBanner;
