/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/control-has-associated-label */
import {
  Carousel, Image, CarouselProps
} from 'antd';
import { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import {
  getTrendingFeeds,
  moreTrendingFeeds,
  resetFeeds
} from '@redux/feed/actions';
import './discover-carousel.less';
import Link from 'next/link';
import * as linkify from 'linkifyjs';
import hashtag from 'linkifyjs/plugins/hashtag';
import { videoDuration } from '@lib/index';
import { CarouselRef } from 'antd/lib/carousel';
import { debounce } from 'lodash';
import { TickIcon } from 'src/icons';

hashtag(linkify);

interface IProps {
  onGetFeeds: Function;
  onMoreFeeds: Function;
  tab:string
  onHandleFeedChange:Function
  title:string;
  feeds:any;
  index:number;
  className: string
}

const DiscoverCarousel = ({
  tab,
  onHandleFeedChange,
  title,
  feeds,
  index,
  className
}: IProps) => {
  const sliderRef = useRef(null as CarouselRef);
  const [isAnimation, setAnimation] = useState(false);

  const slickHandle = (e, slider, slick_is_animating) => {
    e.preventDefault();
    if (sliderRef && sliderRef.current) {
      const direction = e.deltaX;
      const { slickNext, slickPrev } = sliderRef.current.innerSlider;
      const delta = e.deltaX || e.wheelDeltaX;
      if (!delta) {
        return;
      }

      if (((slider.scrollLeft + slider.offsetWidth) === slider.scrollWidth && delta > 0) || (slider.scrollLeft === 0 && delta < 0)) {
        e.preventDefault();
      }
      if (!slick_is_animating) {
        direction < 0 && slickPrev();
        direction > 0 && slickNext();
      }
    }
  };

  const onWheel = debounce(slickHandle, 100, null);

  useEffect(() => {
    const slider = document.querySelector(`.${className}`);

    slider.addEventListener('wheel', (e) => { onWheel(e, slider, isAnimation); });
    return () => {
      slider.removeEventListener('wheel', (e) => onWheel(e, slider, isAnimation));
    };
  }, []);

  const settings = {
    dots: false,
    speed: 400,
    slidesToShow: tab === 'video' ? 7 : 5,
    slidesToScroll: tab === 'video' ? 7 : 5,
    vertical: false,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      }
    ]
  } as CarouselProps;

  return (

    <div className="w-full">
      <Carousel
        initialSlide={index}
        infinite={false}
        {...settings}
        afterChange={(val) => { setAnimation(false); onHandleFeedChange(val, title); }}
        beforeChange={() => setAnimation(true)}
        className={className}
        ref={sliderRef}
      >
        {feeds.map((feed) => (
            <Link
              href={{
                pathname: '/trending',
                query: {
                  id: feed._id,
                  tab
                }
              }}
            >
              <div className={feed?.type === 'photo' 
                ? 'relative rounded-lg w-full overflow-hidden cursor-pointer' 
                : 'relative rounded-lg w-full overflow-hidden cursor-pointer'
                }
                style={{
                  aspectRatio: feed?.type === 'video' ? '4 / 6' : '1'
                }} 
              >
                {/* {feed.type === 'video' && <PlayIcon className='absolute -top-6 left-0 bottom-0 right-0 m-auto flex items-center justify-center pb-3 transition-all z-50' />} */}
                <div
                  className="absolute w-full h-full top-0 left-0 bottom-0 right-0 z-0"
                  style={{
                    backgroundImage: `url(${tab === 'video'
                    ? (
                      (feed.thumbnail?.url || (feed.files[0].thumbnails && feed.files[0].thumbnails[0]) || '/static/no-image.jpg')
                      )
                    : feed.files[0].url || '/static/no-image.jpg'})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover'
                  }}
                />
                <div className="absolute w-full h-full top-0 left-0 bottom-0 right-0 z-10 bg-black/30 flex items-end justify-start">
                  {feed.type === 'video' && 
                    <span className='absolute top-1 right-2 text-white'>
                      {videoDuration(feed?.files[0].duration)}
                    </span>
                  }
                  <div className="flex-1 p-3 text-white text-start">
                    <p className='flex items-center font-semibold'>
                      {feed.performer.name} 
                      {feed.performer.verifiedAccount && <TickIcon className='ml-1' />}
                    </p>
                    <p>
                      {feed.stats.views}
                      <span className='pl-1'>Views</span>
                    </p>
                  </div>
                </div>
              </div>
            </Link>
        ))}
      </Carousel>
    </div>
  );
};

const mapStates = (state) => ({
  ui: { ...state.ui },
  user: { ...state.user.current },
  feedState: { ...state.feed.feeds },
  feedTrendingState: { ...state.feed.trendingFeeds },
  settings: { ...state.settings }
});

const mapDispatch = {
  moreTrendingFeeds,
  getTrendingFeeds,
  resetFeeds
};

export default connect(mapStates, mapDispatch)(DiscoverCarousel);
