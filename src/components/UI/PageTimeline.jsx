import React, { useEffect, useState, useRef } from 'react';
import {
    Timeline, TimelineConnector, TimelineContent,
    TimelineDot, TimelineItem, TimelineSeparator
} from "@mui/lab";
import './PageTimeline.css';
import { useTranslation } from 'react-i18next';
import i18n from '../../translations/i18n';

const PageTimeline = ({ pageObjects, document }) => {
    const { t } = useTranslation();
    const lang = i18n.language;

    const [currentObjectId, setCurrentObjectId] = useState(null);
    const observer = useRef(null);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        observer.current = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setCurrentObjectId(entry.target.id);
                }
            });
        }, options);

        pageObjects.forEach(pageObject => {
            const element = document.getElementById(pageObject.objectId);
            if (element) {
                observer.current.observe(element);
            }
        });

        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, [pageObjects, document]);

    const handleMouseOver = (index) => {
        const timelineDot = document.getElementsByClassName('timelineDot')[index];
        const timelineContent = document.getElementsByClassName('timelineContent')[index];
        timelineDot.classList.add('hovered');
        timelineContent.classList.add('hovered');
    };

    const handleMouseOut = (index) => {
        const timelineDot = document.getElementsByClassName('timelineDot')[index];
        const timelineContent = document.getElementsByClassName('timelineContent')[index];
        timelineDot.classList.remove('hovered');
        timelineContent.classList.remove('hovered');
    };

    const onSelect = (pageObject) => {
        document.getElementById(pageObject.objectId).scrollIntoView({
            behavior: 'smooth'
        });
        setCurrentObjectId(pageObject.id);
    };

    return (
        <Timeline className="timeline">
            {pageObjects.map((pageObject, index) => (
                <TimelineItem key={index}
                    className='timelineItem'
                    onMouseOver={() => handleMouseOver(index)}
                    onMouseOut={() => handleMouseOut(index)}
                    onClick={() => onSelect(pageObject)}
                >
                    <TimelineSeparator>
                        <TimelineDot
                            className={pageObject.objectId === currentObjectId ?
                                'timelineDot primary' : 'timelineDot'}
                        />
                        {
                            index < pageObjects.length - 1 &&
                            <TimelineConnector className="timelineConnector" />
                        }
                    </TimelineSeparator>
                    <TimelineContent
                        className={pageObject.objectId === currentObjectId ?
                            'timelineContent primary' : 'timelineContent'}
                        onClick={() => onSelect(pageObject)}
                    >
                        {pageObject.name[lang]}
                    </TimelineContent>
                </TimelineItem>
            ))}
        </Timeline>
    );
}

export default PageTimeline;
