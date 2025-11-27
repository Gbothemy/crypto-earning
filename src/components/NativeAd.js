import React, { useEffect, useState } from 'react';
import trafficTracker from '../utils/trafficTracker';
import './NativeAd.css';

function NativeAd({ style = 'card' }) {
  const [adContent, setAdContent] = useState(null);

  useEffect(() => {
    trafficTracker.trackAdImpression();
    setAdContent(getAdContent());
  }, []);

  const handleAdClick = () => {
    trafficTracker.onAdClick();
    alert('Ad clicked! This would redirect to advertiser site.');
  };

  const getAdContent = () => {
    const nativeAds = [
      {
        icon: '🚀',
        title: 'Boost Your Crypto Portfolio',
        description: 'Join thousands of traders earning passive income with our automated trading bot. No experience needed.',
        sponsor: 'CryptoBot Pro',
        image: '💹'
      },
      {
        icon: '🔐',
        title: 'Secure Your Digital Assets',
        description: 'Hardware wallet with military-grade security. Protect your crypto from hackers and theft.',
        sponsor: 'SecureVault',
        image: '🛡️'
      },
      {
        icon: '📚',
        title: 'Master Crypto Trading',
        description: 'Free 7-day course on cryptocurrency trading. Learn from industry experts and start earning today.',
        sponsor: 'Crypto Academy',
        image: '🎓'
      },
      {
        icon: '💎',
        title: 'Exclusive NFT Collection',
        description: 'Limited edition NFTs with real utility. Early access for Cipro members. Mint now before they sell out.',
        sponsor: 'NFT Marketplace',
        image: '🖼️'
      },
      {
        icon: '⚡',
        title: 'Lightning Fast Exchanges',
        description: 'Swap any crypto instantly with zero fees. Best rates guaranteed. Join 1M+ satisfied users.',
        sponsor: 'SwapFast',
        image: '🔄'
      }
    ];
    
    return nativeAds[Math.floor(Math.random() * nativeAds.length)];
  };

  if (!adContent) return null;

  if (style === 'card') {
    return (
      <div className="native-ad native-ad-card" onClick={handleAdClick}>
        <div className="native-ad-badge">Sponsored</div>
        <div className="native-ad-icon">{adContent.icon}</div>
        <div className="native-ad-content">
          <h3 className="native-ad-title">{adContent.title}</h3>
          <p className="native-ad-description">{adContent.description}</p>
          <div className="native-ad-footer">
            <span className="native-ad-sponsor">{adContent.sponsor}</span>
            <span className="native-ad-cta">Learn More →</span>
          </div>
        </div>
      </div>
    );
  }

  if (style === 'inline') {
    return (
      <div className="native-ad native-ad-inline" onClick={handleAdClick}>
        <div className="native-ad-badge">Sponsored</div>
        <div className="native-ad-image">{adContent.image}</div>
        <div className="native-ad-content">
          <h4 className="native-ad-title">{adContent.title}</h4>
          <p className="native-ad-description">{adContent.description}</p>
          <span className="native-ad-sponsor">by {adContent.sponsor}</span>
        </div>
      </div>
    );
  }

  return null;
}

export default NativeAd;
