import React from 'react';
import ToolTip from "../../library/tooltip/tooltip";

class VideoPlayer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            paused: true,
            muted: false,
            length: null,
            formattedLength: null,
            currentTime: null,
            formattedTime: null,
            volume: 0.5
        };
        this.fullscreen = React.createRef();
        this.icon1 = React.createRef();
        this.icon2 = React.createRef();
        this.controls = React.createRef();
        this.volumeRange = React.createRef();
        this.current_Value = React.createRef();
        this.time_range = React.createRef();
        this.time_value = React.createRef();
        this.v = React.createRef();
        this.playPauseBtn = React.createRef();
    } 

    play() {
        this.duration();
        const play_btn_onload = document.getElementsByClassName(".play_btn_onload");
        const video_overlay = document.querySelector(".video-overlay");
        const controls = document.querySelector(".controls");
        this.setState({
            paused: !this.state.paused
        });

        if (this.state.paused === true) {
            this.v.current.play();
            this.setState({
                paused: false
            });
            if (play_btn_onload.length === 0) {
                controls.classList.add('show');
                controls.classList.remove('hide');
                video_overlay.classList.add('remove_overlay');
                document.querySelector(".play_btn_onload").classList.add("hide");
            }
        } else {
            this.v.current.pause();
            this.setState({
                paused: true
            });
        }
        this.playPauseBtn.current.focus();
    }

    duration() {
        let dur = this.v.current.duration;
        if(isNaN(dur)){
            dur = this.v.current.currentTime;
        }
        dur = dur.toFixed();
        let formattedLength = this.convertHMS(dur);
        this.setState({
            length: dur,
            formattedLength: formattedLength
        });

        return dur;
    }

    convertHMS(value) {
        const sec = parseInt(value, 10); // convert value to number if it's string
        let hours   = Math.floor(sec / 3600); // get hours
        let minutes = Math.floor((sec - (hours * 3600)) / 60); // get minutes
        let seconds = sec - (hours * 3600) - (minutes * 60); //  get seconds
        // add 0 if value < 10; Example: 2 => 02
        if (hours   < 10) {hours   = "0"+hours;}
        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}
        return minutes+':'+seconds; // Return is HH : MM : SS
    }

    currentTime() {
        let cur = this.v.current.currentTime;
        cur = cur.toFixed();
        let formattedTime = this.convertHMS(cur);
        this.setState({
            currentTime: cur,
            formattedTime: formattedTime
        });
        if (parseInt(this.state.currentTime) === parseInt(this.state.length)) {
            this.setState({ paused: true });
        }

        return cur;
    }

    customTime() {
        const time_range = document.querySelector(".time_range");
        this.v.current.currentTime = time_range.value;

        this.setState({
            currentTime: time_range.value
        });
    }

    customVolume() {
        const volume_range = document.querySelector(".volume_range");
        this.v.current.volume = volume_range.value;
        this.setState({
            volume: volume_range.value
        });
        if (Number(volume_range.value) === 0) {
            this.setState({
                muted: true
            });
        } else {
            this.setState({
                muted: false
            });
        }
    }

    mute() {
        this.v.current.muted = true;
        this.setState({
            muted: true
        });
        if (this.state.muted === true) {
            this.v.current.muted = false;
            this.setState({
                muted: false
            });
            this.volumeRange.current.value = 0.5;
            this.volumeRange.current.style.background = "linear-gradient(90deg, rgb(76, 131, 58) 50%, transparent 50%)";
            this.customVolume();
        } else {
            this.v.current.muted = true;
            this.setState({
                muted: true
            });
            this.volumeRange.current.value = 0;
            this.volumeRange.current.style.background = "transparent";
            this.customVolume();
        }
    }

    componentDidMount() {
        this.customVolume();
        setInterval(() => this.setState({ currentTime: this.currentTime() }), 10);
        setInterval(() => this.setState({ length: this.duration() }), 10);
    }

    openFullscreen = () => {
        if (this.fullscreen.current.requestFullscreen) {
            this.fullscreen.current.requestFullscreen();
            this.controls.current.classList.add("fullscreen");
            this.icon1.current.classList.add("hide");
            this.icon2.current.classList.remove("hide");
        } else if (this.fullscreen.current.webkitRequestFullscreen) {
            this.fullscreen.current.webkitRequestFullscreen();
            this.controls.current.classList.add("fullscreen");
            this.icon1.current.classList.add("hide");
            this.icon2.current.classList.remove("hide");
        } else if (this.fullscreen.current.msRequestFullscreen) {
            this.fullscreen.current.msRequestFullscreen();
            this.controls.current.classList.add("fullscreen");
            this.icon1.current.classList.add("hide");
            this.icon2.current.classList.remove("hide");
        }
    }

    closeFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
            this.controls.current.classList.remove("fullscreen");
            this.icon1.current.classList.remove("hide");
            this.icon2.current.classList.add("hide");
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
            this.controls.current.classList.remove("fullscreen");
            this.icon1.current.classList.remove("hide");
            this.icon2.current.classList.add("hide");
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
            this.controls.current.classList.remove("fullscreen");
            this.icon1.current.classList.remove("hide");
            this.icon2.current.classList.add("hide");
        }
    }



    volumeControl() {
        this.volumeRange.current.style.background = 'linear-gradient(90deg, #4c833a ' + this.volumeRange.current.value * 100 + '%, transparent ' + this.volumeRange.current.value * 100 + '%)';
        var val = (100 / this.volumeRange.current.getAttribute("max")) * (this.volumeRange.current.value);
        var c = 0;
        switch (Math.round(val)) {
            case 0:
                c = 14;
                break;
            case 5:
                c = 12;
                break;
            case 10:
                c = 12;
                break;
            case 15:
                c = 10;
                break;
            case 20:
                c = 9;
                break;
            case 25:
                c = 8;
                break;
            case 30:
                c = 7;
                break;
            case 35:
                c = 7;
                break;
            case 40:
                c = 6;
                break;
            case 45:
                c = 5;
                break;
            case 50:
                c = 4;
                break;
            case 55:
                c = 3;
                break;
            case 60:
                c = 2;
                break;
            case 65:
                c = 1;
                break;
            case 70:
                c = 0;
                break;
            case 75:
                c = -1;
                break;
            case 80:
                c = -2;
                break;
            case 85:
                c = -3;
                break;
            case 90:
                c = -4;
                break;
            case 95:
                c = -5;
                break;
            case 100:
                c = -6;
                break;
            default:
                c = 0;
                break;

        }
        this.current_Value.current.style.top = (100 - val) + c + "px";
    }

    volumeControlOver() {
        this.current_Value.current.style.opacity = 1;
        this.volumeControl();
    }

    timeControl() {
        var val = (100 / this.time_range.current.getAttribute("max")) * this.time_range.current.value;
        this.time_value.current.style.left = val + "%";
    }

    timeControlOver() {
        this.time_value.current.style.opacity = 1;
        this.timeControl();
    }

    timeControlLeave() {
        this.time_value.current.style.opacity = 0;
        this.current_Value.current.style.opacity = 0
    }

    videoEnd() {
        this.v.current.autoplay=false;
        this.v.current.load();
    }

    render() {
        return (
            <div className="VideoPlayer">
                <div className="video-player">
                    <div className="default-container container">
                        <div className="row">
                            <div className="col-12">
                                <div className="mt-5">
                                    <div ref={this.fullscreen}>
                                        <div className="display-flex" onClick={this.play.bind(this)}>
                                            <video className="video" ref={this.v} preload="metadata" poster="./images/poster-img.jpg" playsInline aria-hidden="true" onEnded={this.videoEnd.bind(this)}>
                                                <source src="./video/homevideo.mp4" type="video/mp4"></source>
                                            </video>
                                            <div className="video video-overlay">
                                                <ToolTip text='play Homepage video'>
                                                    <button className="play_pause_btn play_btn_onload" name="Play Button Onload" aria-label='Play Button Onload'>
                                                        <span><i className="fa fa-play" aria-hidden="true"></i></span>
                                                    </button>
                                                </ToolTip>
                                            </div>
                                        </div>

                                        <div className="controls hide" ref={this.controls}>
                                            <button ref={this.playPauseBtn} onClick={this.play.bind(this)} className="play_pause_btn" aria-label='Play Pause Button'>
                                                <ToolTip text='play Homepage video'>
                                                    <span
                                                        className={this.state.paused ? "svg_play_pause" : "hide"}>
                                                        <span><i className="fa fa-play" aria-hidden="true"></i></span>
                                                    </span>
                                                </ToolTip>

                                                <ToolTip text='pause'>
                                                    <span
                                                        className={this.state.paused ? "hide" : "svg_play_pause"}
                                                    >
                                                        <span><i className="fa fa-pause" aria-hidden="true"></i></span>
                                                    </span>
                                                </ToolTip>
                                            </button>

                                            <span className="time">
                                                <span className="video_time">{this.state.formattedTime}</span>
                                                <span> / </span>
                                                <span className="video_length">{this.state.formattedLength}</span>
                                            </span>
                                            <span className='time-range-value'>
                                                <input
                                                    type="range"
                                                    className="time_range"
                                                    ref={this.time_range}
                                                    onChange={this.customTime.bind(this)}
                                                    value={this.state.currentTime | null}
                                                    // step={0.1}
                                                    min={0}
                                                    max={this.state.length}
                                                    onInput={this.timeControl.bind(this)}
                                                    onMouseOver={this.timeControlOver.bind(this)}
                                                    onMouseLeave={this.timeControlLeave.bind(this)}
                                                />
                                                <div className="current-value time-range-tooltip" ref={this.time_value}><div className="text-tooltip">{this.state.formattedTime}</div></div>
                                            </span>
                                            <div className='volume-container'>
                                                <button onClick={this.mute.bind(this)} className="mute_unmute_btn" aria-label='Mute Unmute Button'>
                                                    <span
                                                        className={this.state.muted ? "hide" : "svg_mute_unmute"}>
                                                        <i className="fa fa-volume-up"></i>
                                                    </span>
                                                    <span
                                                        className={this.state.muted ? "svg_mute_unmute" : "hide"}>
                                                        <i className="fa fa-volume-mute"></i>
                                                    </span>
                                                </button>
                                                <div className="volume-wraper">
                                                    <input
                                                        type="range"
                                                        className="volume_range"
                                                        ref={this.volumeRange}
                                                        orient="vertical"
                                                        onChange={this.customVolume.bind(this)}
                                                        value={this.state.volume}
                                                        step={0.05}
                                                        min={0}
                                                        max={1}
                                                        onInput={this.volumeControl.bind(this)}
                                                        onMouseOver={this.volumeControlOver.bind(this)}
                                                        onMouseLeave={this.timeControlLeave.bind(this)}
                                                    />
                                                    <div className="current-value" ref={this.current_Value}><div className="text-tooltip">{Number.parseInt(this.state.volume * 100)}</div></div>
                                                </div>
                                            </div>
                                            <ToolTip text='full screen'>
                                                <>
                                                    <button className="fullscreen_btn" ref={this.icon1} onClick={this.openFullscreen.bind(this)} area-lanel="Button Expan">
                                                        <i className="fa fa-expand" aria-hidden="true"></i>
                                                    </button>
                                                    <button className="fullscreen_btn hide" ref={this.icon2} onClick={this.closeFullscreen.bind(this)} area-label="Button Compress">
                                                        <i className="fa fa-compress" aria-hidden="true"></i>
                                                    </button>
                                                </>
                                            </ToolTip>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="ms-spacer" data-m-t="spacer"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default VideoPlayer;
