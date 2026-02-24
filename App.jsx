import React, { useState } from 'react';
import { Heart, MessageCircle, Upload, User, Users, Palette } from 'lucide-react';

export default function App() {
  const [cards, setCards] = useState([
    {
      id: 1,
      frontImage: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&h=600&fit=crop',
      backImage: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=400&h=600&fit=crop',
      user: 'Mike Johnson',
      cardName: '1986 Fleer Michael Jordan RC',
      grade: 'PSA 9',
      likes: 24,
      comments: [
        { user: 'Sarah K', text: 'Holy grail! 🔥' },
        { user: 'Tom B', text: 'Beautiful centering on this one' }
      ]
    },
    {
      id: 2,
      frontImage: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=400&h=600&fit=crop',
      backImage: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=400&h=600&fit=crop',
      user: 'Alex Chen',
      cardName: '2003 Topps LeBron James RC',
      grade: 'BGS 9.5',
      likes: 18,
      comments: [
        { user: 'Mike Johnson', text: 'The King 👑' }
      ]
    },
    {
      id: 3,
      frontImage: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=400&h=600&fit=crop',
      backImage: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&h=600&fit=crop',
      user: 'Sarah K',
      cardName: '1952 Topps Mickey Mantle',
      grade: 'SGC 7',
      likes: 42,
      comments: [
        { user: 'Alex Chen', text: 'Wow, incredible piece of history' },
        { user: 'Tom B', text: 'Dream card right there' }
      ]
    }
  ]);

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [flippedCards, setFlippedCards] = useState({});
  const [newComment, setNewComment] = useState('');
  const [userName] = useState('You');

  // Gradient color state — defaults to blue → gold
  const [gradientColor1, setGradientColor1] = useState('#1e3a8a');
  const [gradientColor2, setGradientColor2] = useState('#b45309');
  const [showColorPicker, setShowColorPicker] = useState(false);

  const currentCard = cards[currentCardIndex];

  const nextCard = () => {
    setCurrentCardIndex((prev) => (prev + 1) % cards.length);
    setNewComment('');
  };

  const prevCard = () => {
    setCurrentCardIndex((prev) => (prev - 1 + cards.length) % cards.length);
    setNewComment('');
  };

  const toggleFlip = () => {
    setFlippedCards(prev => ({
      ...prev,
      [currentCardIndex]: !prev[currentCardIndex]
    }));
  };

  const handleLike = () => {
    const updatedCards = [...cards];
    updatedCards[currentCardIndex].likes += 1;
    setCards(updatedCards);
  };

  const handleComment = () => {
    if (newComment.trim()) {
      const updatedCards = [...cards];
      updatedCards[currentCardIndex].comments.push({
        user: userName,
        text: newComment
      });
      setCards(updatedCards);
      setNewComment('');
    }
  };

  const [uploadingFront, setUploadingFront] = useState(null);
  const [uploadingBack, setUploadingBack] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newCardName, setNewCardName] = useState('');
  const [newCardGrade, setNewCardGrade] = useState('Raw');

  const handleImageUpload = (event, side) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (side === 'front') {
          setUploadingFront(reader.result);
        } else {
          setUploadingBack(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadComplete = () => {
    if (!uploadingFront) {
      alert('Please upload at least a front image!');
      return;
    }

    const newCard = {
      id: cards.length + 1,
      frontImage: uploadingFront,
      backImage: uploadingBack,
      user: userName,
      cardName: newCardName || 'My Card',
      grade: newCardGrade,
      likes: 0,
      comments: []
    };

    setCards([...cards, newCard]);
    setCurrentCardIndex(cards.length);

    setUploadingFront(null);
    setUploadingBack(null);
    setNewCardName('');
    setNewCardGrade('Raw');
    setShowUploadModal(false);
  };

  const handleCancelUpload = () => {
    setUploadingFront(null);
    setUploadingBack(null);
    setNewCardName('');
    setNewCardGrade('Raw');
    setShowUploadModal(false);
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: `linear-gradient(135deg, ${gradientColor1} 0%, ${gradientColor2} 100%)` }}
    >
      {/* Header */}
      <div className="bg-black/30 backdrop-blur-lg shadow-2xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/50">
              <span className="text-white font-bold text-2xl">🃏</span>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">Cardousel</h1>
          </div>
          <div className="flex items-center gap-3">
            {/* Color Picker Button */}
            <div className="relative">
              <button
                onClick={() => setShowColorPicker(prev => !prev)}
                className="flex items-center gap-2 px-5 py-2.5 text-white hover:bg-white/10 rounded-xl transition-all backdrop-blur-sm border border-white/20 hover:border-white/40"
                title="Customize background colors"
              >
                <Palette size={20} />
                <span className="hidden sm:inline font-medium">Theme</span>
              </button>

              {/* Color Picker Dropdown */}
              {showColorPicker && (
                <div className="absolute right-0 top-14 z-50 bg-slate-900/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-5 w-64">
                  <h4 className="text-white font-bold mb-4 text-sm">Background Gradient</h4>

                  <div className="mb-4">
                    <label className="block text-blue-200 text-xs font-semibold mb-2">Color 1 (Start)</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={gradientColor1}
                        onChange={(e) => setGradientColor1(e.target.value)}
                        className="w-10 h-10 rounded-lg cursor-pointer border-2 border-white/20 bg-transparent"
                      />
                      <span className="text-blue-300 text-xs font-mono">{gradientColor1}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-blue-200 text-xs font-semibold mb-2">Color 2 (End)</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={gradientColor2}
                        onChange={(e) => setGradientColor2(e.target.value)}
                        className="w-10 h-10 rounded-lg cursor-pointer border-2 border-white/20 bg-transparent"
                      />
                      <span className="text-blue-300 text-xs font-mono">{gradientColor2}</span>
                    </div>
                  </div>

                  {/* Preview swatch */}
                  <div
                    className="w-full h-8 rounded-lg border border-white/20"
                    style={{ background: `linear-gradient(135deg, ${gradientColor1}, ${gradientColor2})` }}
                  />

                  {/* Reset to default */}
                  <button
                    onClick={() => { setGradientColor1('#1e3a8a'); setGradientColor2('#b45309'); }}
                    className="mt-3 w-full text-xs text-blue-300 hover:text-white transition-colors py-1"
                  >
                    Reset to Blue → Gold
                  </button>
                </div>
              )}
            </div>

            <button className="flex items-center gap-2 px-5 py-2.5 text-blue-100 hover:bg-blue-800/40 rounded-xl transition-all backdrop-blur-sm border border-blue-500/20 hover:border-blue-400/40">
              <Users size={20} />
              <span className="hidden sm:inline font-medium">Friends</span>
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 text-blue-100 hover:bg-blue-800/40 rounded-xl transition-all backdrop-blur-sm border border-blue-500/20 hover:border-blue-400/40">
              <User size={20} />
              <span className="hidden sm:inline font-medium">Profile</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Top Section: Carousel (2/3) + Card Stats (1/3) */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* Carousel - Takes 2/3 width */}
          <div className="col-span-2 bg-black/20 backdrop-blur-xl rounded-3xl shadow-2xl shadow-black/30 p-8 border border-white/10 flex items-center justify-center">
            {/* 3D Carousel Container */}
            <div className="relative w-full h-[380px]" style={{ perspective: '1100px' }}>
              <div className="absolute inset-0 flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
                {cards.map((card, index) => {
                  const totalCards = cards.length;
                  const angle = ((index - currentCardIndex) * 360) / totalCards;
                  const isActive = index === currentCardIndex;
                  const distance = isActive ? 0 : Math.abs(index - currentCardIndex);
                  const radius = 260;
                  const isFlipped = flippedCards[index] || false;

                  return (
                    <div
                      key={card.id}
                      className="absolute transition-all duration-700 ease-out cursor-pointer"
                      style={{
                        transformStyle: 'preserve-3d',
                        transform: `rotateY(${angle}deg) translateZ(${radius}px) ${isActive ? 'scale(1.05)' : 'scale(0.7)'}`,
                        opacity: isActive ? 1 : distance === 1 ? 0.7 : distance === 2 ? 0.5 : 0.3,
                        zIndex: isActive ? 50 : 10 - distance,
                        pointerEvents: isActive ? 'auto' : 'none',
                      }}
                      onClick={() => !isActive && setCurrentCardIndex(index)}
                    >
                      {/* Card inner — NOTE: no overflow-hidden here; it breaks transformStyle: preserve-3d */}
                      <div
                        className="relative rounded-2xl shadow-2xl"
                        style={{
                          width: '190px',
                          height: '285px',
                          transformStyle: 'preserve-3d',
                          transform: `rotateY(${-angle}deg) rotateY(${isFlipped ? 180 : 0}deg)`,
                          transition: 'transform 0.7s ease',
                        }}
                      >
                        {/* Front of Card */}
                        <div
                          className="absolute inset-0 bg-gradient-to-br from-slate-900 to-blue-950 border-2 rounded-2xl overflow-hidden"
                          style={{
                            backfaceVisibility: 'hidden',
                            WebkitBackfaceVisibility: 'hidden',
                            borderColor: isActive ? '#60a5fa' : 'rgba(59, 130, 246, 0.3)',
                          }}
                        >
                          <img
                            src={card.frontImage}
                            alt={card.cardName}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Back of Card */}
                        {card.backImage && (
                          <div
                            className="absolute inset-0 bg-gradient-to-br from-slate-900 to-blue-950 border-2 rounded-2xl overflow-hidden"
                            style={{
                              backfaceVisibility: 'hidden',
                              WebkitBackfaceVisibility: 'hidden',
                              transform: 'rotateY(180deg)',
                              borderColor: isActive ? '#60a5fa' : 'rgba(59, 130, 246, 0.3)',
                            }}
                          >
                            <img
                              src={card.backImage}
                              alt={`${card.cardName} - back`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}

                        {/* Counter badge — front face only */}
                        {isActive && (
                          <div
                            className="absolute bottom-2 right-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-2.5 py-1 rounded-full text-xs font-semibold shadow-lg border border-blue-400/30 z-10"
                            style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                          >
                            {index + 1} / {totalCards}
                          </div>
                        )}
                      </div>

                      {/* Flip button — outside the rotating card so it's always visible on both sides */}
                      {isActive && card.backImage && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFlip();
                          }}
                          className="absolute top-2 right-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-2.5 py-1.5 rounded-lg text-xs font-semibold shadow-lg border border-blue-400/30 transition-all"
                          style={{
                            zIndex: 100,
                            transform: `rotateY(${-angle}deg)`,
                          }}
                        >
                          🔄 {isFlipped ? 'Front' : 'Flip'}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevCard}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-[60] bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-full p-3 transition-all shadow-xl shadow-blue-900/50 border border-blue-400/30"
              >
                <span className="text-xl font-bold">‹</span>
              </button>
              <button
                onClick={nextCard}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-[60] bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-full p-3 transition-all shadow-xl shadow-blue-900/50 border border-blue-400/30"
              >
                <span className="text-xl font-bold">›</span>
              </button>
            </div>
          </div>

          {/* Card Stats - Takes 1/3 width */}
          <div className="col-span-1 bg-black/20 backdrop-blur-xl rounded-3xl shadow-2xl shadow-black/30 p-6 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-6">Card Details</h3>

            {/* User Info */}
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-blue-500/20">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/50 border-2 border-blue-400/30">
                {currentCard.user[0]}
              </div>
              <div>
                <p className="font-semibold text-blue-100">{currentCard.user}</p>
                <p className="text-blue-300 text-sm">Collector</p>
              </div>
            </div>

            {/* Card Name & Grade */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">{currentCard.cardName}</h2>
              <div className="flex items-center gap-2">
                <span className="text-blue-300 font-medium">Grade:</span>
                <span className="px-3 py-1 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-lg text-sm font-bold border border-emerald-400/30">
                  {currentCard.grade}
                </span>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center p-3 bg-gradient-to-r from-rose-800/40 to-pink-800/40 rounded-xl border border-rose-500/20">
                <span className="text-rose-200 font-medium text-sm">Likes</span>
                <span className="font-bold text-2xl bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent">
                  {currentCard.likes}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-800/40 to-purple-800/40 rounded-xl border border-purple-500/20">
                <span className="text-purple-200 font-medium text-sm">Comments</span>
                <span className="font-bold text-2xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {currentCard.comments.length}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleLike}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white rounded-xl transition-all shadow-lg shadow-rose-900/50 font-semibold border border-rose-400/30"
              >
                <Heart size={20} fill="currentColor" />
                <span>Like This Card</span>
              </button>
              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-xl transition-all shadow-lg shadow-blue-900/50 font-semibold border border-blue-400/30">
                <MessageCircle size={20} />
                <span>View Comments</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section: Comments (2/3) + Sidebar (1/3) */}
        <div className="grid grid-cols-3 gap-6">
          {/* Comments Section - Takes 2/3 width */}
          <div className="col-span-2 bg-black/20 backdrop-blur-xl rounded-3xl shadow-2xl shadow-black/30 p-6 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-4">Comments</h3>

            {/* Comments List */}
            <div className="space-y-2 mb-6">
              {currentCard.comments.map((comment, idx) => (
                <div key={idx} className="border-l-2 border-blue-500/30 pl-4 py-2">
                  <span className="font-semibold text-blue-300 text-sm">{comment.user}</span>
                  <p className="text-blue-100/90 mt-0.5 text-sm">{comment.text}</p>
                </div>
              ))}
            </div>

            {/* Add Comment */}
            <div className="flex gap-3">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleComment()}
                placeholder="Add a comment..."
                className="flex-1 px-4 py-3 bg-slate-900/50 border border-blue-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-blue-300/50 backdrop-blur-sm"
              />
              <button
                onClick={handleComment}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-xl transition-all font-semibold shadow-lg shadow-blue-900/50 border border-blue-400/30"
              >
                Post
              </button>
            </div>
          </div>

          {/* Right Sidebar - Takes 1/3 width */}
          <div className="col-span-1 space-y-6">
            {/* Collection Grid */}
            <div className="bg-black/20 backdrop-blur-xl rounded-3xl shadow-2xl shadow-black/30 p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">Latest Pickups</h3>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {cards.slice(-9).reverse().map((card, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentCardIndex(cards.indexOf(card))}
                    className={`aspect-[2/3] rounded-xl overflow-hidden hover:ring-2 hover:ring-blue-400 transition-all transform hover:scale-105 shadow-lg border-2 ${
                      cards.indexOf(card) === currentCardIndex
                        ? 'ring-2 ring-blue-500 border-blue-400 scale-105'
                        : 'border-blue-600/30'
                    }`}
                  >
                    <img
                      src={card.frontImage}
                      alt={card.cardName}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Upload Card */}
            <div className="bg-black/20 backdrop-blur-xl rounded-3xl shadow-2xl shadow-black/30 p-5 border border-white/10">
              <h3 className="text-lg font-bold text-white mb-3">Add to Collection</h3>
              <button
                onClick={() => setShowUploadModal(true)}
                className="w-full py-4 border-2 border-dashed border-blue-500/40 rounded-2xl hover:border-blue-400 hover:bg-blue-800/20 transition-all flex flex-col items-center gap-2 text-blue-200 hover:text-blue-100 group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-blue-900/50 border border-blue-400/30">
                  <Upload size={24} className="text-white" />
                </div>
                <span className="font-semibold text-sm">Upload Photos</span>
                <span className="text-xs text-blue-300">(Front & back)</span>
              </button>
            </div>

            {/* Community Stats */}
            <div className="bg-black/20 backdrop-blur-xl rounded-3xl shadow-2xl shadow-black/30 p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">Community</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-800/40 to-cyan-800/40 rounded-xl border border-blue-500/20">
                  <span className="text-blue-200 font-medium text-sm">Total Cards</span>
                  <span className="font-bold text-2xl bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">{cards.length}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-rose-800/40 to-pink-800/40 rounded-xl border border-rose-500/20">
                  <span className="text-rose-200 font-medium text-sm">Total Likes</span>
                  <span className="font-bold text-2xl bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent">
                    {cards.reduce((sum, card) => sum + card.likes, 0)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-gradient-to-br from-slate-800 to-blue-900 rounded-3xl shadow-2xl border border-blue-500/30 p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-3xl font-bold text-white mb-6">Upload New Card</h2>

            {/* Card Details */}
            <div className="mb-6 space-y-4">
              <div>
                <label className="block text-blue-200 font-semibold mb-2">Card Name</label>
                <input
                  type="text"
                  value={newCardName}
                  onChange={(e) => setNewCardName(e.target.value)}
                  placeholder="e.g., 1986 Fleer Michael Jordan RC"
                  className="w-full px-4 py-3 bg-slate-900/50 border border-blue-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-blue-300/50"
                />
              </div>

              <div>
                <label className="block text-blue-200 font-semibold mb-2">Grade</label>
                <select
                  value={newCardGrade}
                  onChange={(e) => setNewCardGrade(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-blue-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                >
                  <option value="Raw">Raw (Ungraded)</option>
                  <option value="PSA 10">PSA 10</option>
                  <option value="PSA 9">PSA 9</option>
                  <option value="PSA 8">PSA 8</option>
                  <option value="BGS 9.5">BGS 9.5</option>
                  <option value="BGS 9">BGS 9</option>
                  <option value="SGC 10">SGC 10</option>
                  <option value="SGC 9">SGC 9</option>
                </select>
              </div>
            </div>

            {/* Photo Upload Section */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              {/* Front Image */}
              <div>
                <label className="block text-blue-200 font-semibold mb-3">Front Image *</label>
                {uploadingFront ? (
                  <div className="relative aspect-[2/3] rounded-xl overflow-hidden border-2 border-blue-500">
                    <img src={uploadingFront} alt="Front" className="w-full h-full object-cover" />
                    <button
                      onClick={() => setUploadingFront(null)}
                      className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-2 transition-all"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <label className="block aspect-[2/3] border-2 border-dashed border-blue-500/40 rounded-xl hover:border-blue-400 hover:bg-blue-800/20 transition-all cursor-pointer flex flex-col items-center justify-center">
                    <Upload size={48} className="text-blue-400 mb-2" />
                    <span className="text-blue-200 font-semibold">Choose Front</span>
                    <span className="text-blue-300 text-sm mt-1">Tap to upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={(e) => handleImageUpload(e, 'front')}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* Back Image */}
              <div>
                <label className="block text-blue-200 font-semibold mb-3">Back Image (Optional)</label>
                {uploadingBack ? (
                  <div className="relative aspect-[2/3] rounded-xl overflow-hidden border-2 border-blue-500">
                    <img src={uploadingBack} alt="Back" className="w-full h-full object-cover" />
                    <button
                      onClick={() => setUploadingBack(null)}
                      className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-2 transition-all"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <label className="block aspect-[2/3] border-2 border-dashed border-blue-500/40 rounded-xl hover:border-blue-400 hover:bg-blue-800/20 transition-all cursor-pointer flex flex-col items-center justify-center">
                    <Upload size={48} className="text-blue-400 mb-2" />
                    <span className="text-blue-200 font-semibold">Choose Back</span>
                    <span className="text-blue-300 text-sm mt-1">Tap to upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={(e) => handleImageUpload(e, 'back')}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleCancelUpload}
                className="flex-1 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl transition-all font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleUploadComplete}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-xl transition-all font-semibold shadow-lg"
              >
                Add to Collection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
