import { useRef, useState } from 'react'
import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from '@mui/icons-material'
import './list.scss'
import ListItem from '../listItem/ListItem'
export default function List({list}) {
    const [isMoved, setIsMoved] = useState(false);
    const [slideNumber, setSlideNumber] = useState(0);
    const [clickLimit, setClickLimit] = useState(window.innerWidth / 255);

    const listRef = useRef();
    const handleClick = (direction) => {
        setIsMoved(true);
        let distance = listRef.current.getBoundingClientRect().x -55;
        if(direction === "left" && slideNumber > 0){
            setSlideNumber(slideNumber - 1);
            listRef.current.style.transform =  `translateX(${255 + distance}px)`
        }
        if(direction === "right" && slideNumber < 10 - clickLimit){
            setSlideNumber(slideNumber + 1);
            listRef.current.style.transform =  `translateX(${-255 + distance}px)`
        }
    }
    return (
        <div className='list'>
            <div className="listTitle">{list.title}</div>
            <div className="wrapper">
                <ArrowBackIosOutlined className='sliderArrow left' onClick={()=>handleClick("left")}
                 style={{display : !isMoved && "none"}}
                />
                <div className="container" ref={listRef}>
                    {list.content.map((item, i) => (
                        <ListItem index={i} item={item}/>
                    ))}
                </div>
                <ArrowForwardIosOutlined className='sliderArrow right' onClick={()=>handleClick("right")}/>
            </div>
        </div>
    )
}


