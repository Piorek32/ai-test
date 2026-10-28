import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home',
  styleUrl: './home.scss',
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  protected readonly title = 'Dodge Charger';
  /** Words split into letters, each with a global index used to stagger the animation. */
  protected readonly words = this.title
    .split(' ')
    .reduce<{ letter: string; index: number }[][]>((words, word) => {
      const offset = words.flat().length + words.length;
      return [...words, [...word].map((letter, i) => ({ letter, index: offset + i }))];
    }, []);
  protected readonly subtitle = 'American muscle. Pure V8 attitude.';
  protected readonly image = {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/22_Dodge_Charger_SRT_Hellcat_Redeye_Jailbreak_Widebody.jpg/1920px-22_Dodge_Charger_SRT_Hellcat_Redeye_Jailbreak_Widebody.jpg',
    alt: 'Dodge Charger SRT Hellcat Redeye Widebody',
    credit: 'Photo: HJUdall, CC0, via Wikimedia Commons',
    creditUrl:
      'https://commons.wikimedia.org/wiki/File:22_Dodge_Charger_SRT_Hellcat_Redeye_Jailbreak_Widebody.jpg',
  };
}
