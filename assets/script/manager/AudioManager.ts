import { GlobalConfig } from "../Config";


export default class AudioManager {
    private static instance: AudioManager = null;

    public static getInstance(): AudioManager{
        if(this.instance == null){
            this.instance = new AudioManager();
        }
        return this.instance;
    }
    
    private _musicVolume:number;
    private _soundVolume:number;
    private _isOpenMusic:boolean;
    private _isOpenSound:boolean;
    private bgmName:string;

    public set musicVolume(volume) {
        this._musicVolume = volume;
        cc.audioEngine.setMusicVolume(volume);
    }
    public get musicVolume() {
        return this._musicVolume;
    }


    public set soundVolume(volume) {
        this._soundVolume = volume;
        cc.audioEngine.setEffectsVolume(volume);
       
    }
    public get soundVolume() {
        return this._soundVolume;
    }


    public set isOpenMusic(volume:boolean) {
        this._isOpenMusic = volume;
        if(volume){
            this.musicVolume = cc.sys.localStorage.getItem('musicVolume');
        }else{
            cc.sys.localStorage.setItem('musicVolume',this.musicVolume);
            this.musicVolume = 0;
        }
       
    }
    public get isOpenMusic() {
        return this._isOpenMusic;
    }


    public set isOpenSound(volume:boolean) {
        this._isOpenSound = volume;
        if(volume){
            this.musicVolume = cc.sys.localStorage.getItem('soundVolume');
        }else{
            cc.sys.localStorage.setItem('soundVolume',this.musicVolume);
            this.musicVolume = 0;
        }

    }
    public get isOpenSound() {
        return this._isOpenSound;
    }

    public playSound(soundName: string, loop?: boolean){
        let path = GlobalConfig.soundPath + soundName;
        cc.loader.loadRes(path, cc.AudioClip, function (err, clip) {
            if(err){
                cc.error(err);
                return;
            }
		    cc.audioEngine.play(clip, loop?loop:false, this.soundVolume);
		});
    }
    public playBGM(soundName: string){
        if(this.bgmName == soundName){
            return;
        }
        this.bgmName = soundName;
        cc.audioEngine.stopMusic();
        let path = GlobalConfig.soundPath + soundName;
        cc.loader.loadRes(path, cc.AudioClip, function (err, clip) {
            if(err){
                cc.error(err);
                return;
            }
		    cc.audioEngine.playMusic(clip, true);
		});
    }

    public stopAll(){
        cc.audioEngine.stopAll();
    }

    public pauseAll(){
        cc.audioEngine.pauseAll();
    }

    public resumeAll(){
        cc.audioEngine.resumeAll();
    }
    private constructor(){
        this.musicVolume = cc.sys.localStorage.getItem('musicVolume');
        this.soundVolume = cc.sys.localStorage.getItem('soundVolume');
        this.isOpenMusic = cc.sys.localStorage.getItem('isOpenMusic');
        this.isOpenSound = cc.sys.localStorage.getItem('isOpenSound');
        
    }
}

