import { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import Planete from '../../resources/vectoriel/SpaceNavigator/Planete.svg';
import Asteroid from '../../resources/vectoriel/SpaceNavigator/Asteroid.svg';
import Fusee from '../../resources/vectoriel/SpaceNavigator/Fusee.svg';
import './SpaceScene.css';

// Étoile à 4 branches reprise de Star.svg (viewBox 79.65)
const STAR_PATH = 'M79.65,39.82c-31.38,4.67-35.16,8.45-39.82,39.82C35.16,48.27,31.38,44.49,0,39.82,31.38,35.16,35.16,31.38,39.82,0c4.67,31.38,8.45,35.16,39.82,39.82Z';

// Générateur pseudo-aléatoire déterministe : le ciel est identique à chaque chargement
const random = (() => {
    let seed = 17;
    return () => {
        seed = (seed * 16807) % 2147483647;
        return (seed - 1) / 2147483646;
    };
})();

const dots = Array.from({ length: 110 }, () => ({
    x: random() * 100,
    y: random() * 85,
    r: random() < 0.85 ? 0.6 + random() * 0.6 : 1.4,
    o: 0.25 + random() * 0.6,
}));

// Les étoiles scintillantes restent à droite du texte d'accueil
const sparkles = Array.from({ length: 12 }, (_, i) => ({
    x: 42 + random() * 56,
    y: random() * 70,
    s: 6 + random() * 8,
    delay: (i * 0.7) % 4,
}));

// Hauteur du paysage et position de la crête où est assise la silhouette
const landHeight = { xs: 120, md: 170 };
const CREST_X = '74%';

// Silhouette assise de profil (tournée vers la gauche), genoux repliés, tête levée vers le ciel
const Silhouette = () => (
    <svg viewBox="0 0 100 100" width="100%" height="100%" style={{ display: 'block', overflow: 'visible' }}>
        <g fill="#0d1d21" stroke="#0d1d21" strokeLinecap="round" strokeLinejoin="round">
            {/* buste légèrement penché en arrière */}
            <line x1="63" y1="93" x2="59" y2="61" strokeWidth="15" />
            {/* cuisse, tibia, pied */}
            <line x1="61" y1="94" x2="38" y2="74" strokeWidth="11" />
            <line x1="38" y1="74" x2="32" y2="97" strokeWidth="9" />
            <line x1="33" y1="99" x2="24" y2="99" strokeWidth="5" />
            {/* bras qui entoure les genoux */}
            <line x1="58" y1="63" x2="49" y2="80" strokeWidth="7" />
            <line x1="49" y1="80" x2="38" y2="77" strokeWidth="6" />
            {/* cou + tête levée vers le ciel */}
            <line x1="58" y1="57" x2="55" y2="49" strokeWidth="6.5" />
            <circle cx="54" cy="43" r="8.5" strokeWidth="0" />
            <path d="M46.5,39.5 L43.5,36 L48.5,35.5 Z" strokeWidth="1.5" />
        </g>
    </svg>
);

// Décor complet du bloc d'accueil : ciel étoilé, objets de Space Navigator, collines + silhouette
// Fusée + flammes animées sous la tuyère (Fusee.svg pointe vers le haut)
const Rocket = ({ sx }) => (
    <Box className="space-scene__item rocket" sx={sx}>
        {/* Flammes à facettes, ombrées en deux moitiés comme le corps de la fusée */}
        <svg className="rocket__flame" viewBox="0 0 20 40">
            <g className="rocket__flame-outer">
                <polygon points="6,0 10,0 10,40 8,24 5,30 4,20 2,12" fill="#ff5859" />
                <polygon points="10,0 14,0 18,12 16,20 15,30 12,24 10,40" fill="#d9474a" />
            </g>
            <g className="rocket__flame-inner">
                <polygon points="7.5,0 10,0 10,22 8.5,14 6.5,7" fill="#fff" />
                <polygon points="10,0 12.5,0 13.5,7 11.5,14 10,22" fill="#d7e1df" />
            </g>
        </svg>
        <img src={Fusee} alt="" className="rocket__body" />
    </Box>
);

// Profondeur de chaque plan pour le parallax : 0 = suit la page, 1 = immobile à l'écran
const depth = (value) => ({ '--depth': value });

const SpaceScene = () => {
    const sceneRef = useRef(null);

    // Parallax au défilement : on expose le scroll en variable CSS, chaque plan se décale selon sa profondeur
    useEffect(() => {
        const scene = sceneRef.current;
        if (!scene || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

        let frame = null;
        const update = () => {
            frame = null;
            const y = window.scrollY;
            if (y <= scene.offsetHeight + 200) {
                scene.style.setProperty('--parallax', `${y}px`);
            }
        };
        const onScroll = () => {
            if (frame === null) frame = requestAnimationFrame(update);
        };

        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', onScroll);
            if (frame !== null) cancelAnimationFrame(frame);
        };
    }, []);

    return (
        <Box className="space-scene" aria-hidden="true" ref={sceneRef}>
            {/* Lueur discrète à l'horizon pour détacher les collines et la silhouette */}
            <div className="space-scene__glow" />

            {/* Plan 1 : étoiles, le plus lointain */}
            <div className="space-scene__layer" style={depth(0.6)}>
                <svg className="space-scene__dots" width="100%" height="100%">
                    {dots.map((d, i) => (
                        <circle key={i} cx={`${d.x}%`} cy={`${d.y}%`} r={d.r} fill="#fff" opacity={d.o} />
                    ))}
                </svg>
                {sparkles.map((s, i) => (
                    <svg key={i} className={s.y < 50 ? 'sparkle sparkle--high' : 'sparkle'} viewBox="0 0 79.65 79.65"
                        style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s, animationDelay: `${s.delay}s` }}>
                        <path d={STAR_PATH} fill="#fff" />
                    </svg>
                ))}
            </div>

            {/* Plan 2 : planète */}
            <div className="space-scene__layer" style={depth(0.45)}>
                <Box component="img" src={Planete} alt="" className="space-scene__item"
                    sx={{ width: { xs: 64, md: 120 }, left: { xs: '60%', md: '56%' }, top: { xs: 'auto', md: '12%' }, bottom: { xs: 250, md: 'auto' } }} />
            </div>

            {/* Plan 3 : fusée et astéroïdes, plus proches */}
            <div className="space-scene__layer" style={depth(0.3)}>
                <Rocket sx={{ width: { xs: 18, md: 26 }, left: { xs: '18%', md: '86%' }, top: { xs: 'auto', md: '20%' }, bottom: { xs: 190, md: 'auto' }, transform: 'rotate(32deg)' }} />
                <Box component="img" src={Asteroid} alt="" className="space-scene__item"
                    sx={{ width: { xs: 30, md: 46 }, left: { xs: '84%', md: '70%' }, top: { xs: 'auto', md: '42%' }, bottom: { xs: 175, md: 'auto' }, transform: 'rotate(-12deg)' }} />
                <Box component="img" src={Asteroid} alt="" className="space-scene__item"
                    sx={{ width: { xs: 14, md: 20 }, left: { xs: '40%', md: '48%' }, top: { xs: 'auto', md: '46%' }, bottom: { xs: 215, md: 'auto' }, transform: 'rotate(40deg)' }} />
            </div>

            {/* Plan 4 : colline du fond */}
            <div className="space-scene__layer" style={depth(0.12)}>
                <Box className="space-scene__land" sx={{ height: landHeight }}>
                    <svg viewBox="0 0 1440 200" preserveAspectRatio="none" width="100%" height="100%">
                        <path d="M0,120 C180,80 320,70 470,96 C620,122 760,60 930,58 C1080,56 1200,96 1440,70 L1440,200 L0,200 Z" fill="#132a31" />
                    </svg>
                </Box>
            </div>

            {/* Premier plan : colline + silhouette, défile avec la page et se fond dans la section suivante */}
            <Box className="space-scene__land" sx={{ height: landHeight }}>
                <svg viewBox="0 0 1440 200" preserveAspectRatio="none" width="100%" height="100%">
                    <path d="M0,160 C200,140 380,128 560,142 C760,158 900,72 1066,60 C1150,54 1220,74 1300,104 C1360,126 1400,138 1440,140 L1440,200 L0,200 Z" fill="#0d1d21" />
                </svg>
                <Box sx={{
                    position: 'absolute', left: CREST_X, bottom: '69%',
                    width: { xs: 66, md: 108 }, height: { xs: 66, md: 108 },
                    transform: 'translateX(-50%)',
                }}>
                    <Silhouette />
                </Box>
            </Box>
        </Box>
    );
};

export default SpaceScene;
