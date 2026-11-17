import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './PageTimeline.css';

// Index vertical fixé à droite : un libellé + un petit trait par section,
// la section visible est mise en avant.
const PageTimeline = ({ pageObjects, document }) => {
    const { i18n } = useTranslation();
    const lang = i18n.language;

    const [currentObjectId, setCurrentObjectId] = useState(pageObjects[0]?.objectId ?? null);

    useEffect(() => {
        // Une section est active quand elle traverse le milieu de l'écran
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setCurrentObjectId(entry.target.id);
                }
            });
        }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });

        pageObjects.forEach(pageObject => {
            const element = document.getElementById(pageObject.objectId);
            if (element) {
                observer.observe(element);
            }
        });

        return () => observer.disconnect();
    }, [pageObjects, document]);

    const onSelect = (pageObject) => {
        document.getElementById(pageObject.objectId)?.scrollIntoView({
            behavior: 'smooth'
        });
        setCurrentObjectId(pageObject.objectId);
    };

    return (
        <nav className="timeline">
            {pageObjects.map((pageObject) => (
                <button
                    type="button"
                    key={pageObject.objectId}
                    className={pageObject.objectId === currentObjectId ? 'timelineItem active' : 'timelineItem'}
                    onClick={() => onSelect(pageObject)}
                >
                    <span className="timelineLabel">{pageObject.name[lang] ?? pageObject.name.en}</span>
                    <span className="timelineTick" />
                </button>
            ))}
        </nav>
    );
}

export default PageTimeline;
