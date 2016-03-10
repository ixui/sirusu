# Sirusu　- 記 -
マークダウンによるメモアプリ

[![Build Status](https://travis-ci.org/ixui/sirusu.svg?branch=master)](https://travis-ci.org/ixui/sirusu)

### Current Version
v0.0.1 - Test Deploy

### 記法のサンプル

#### Markdown
```
# 見出し1
## 見出し2
### 見出し3
#### 見出し4
##### 見出し5
###### 見出し6

- **強調 strongです。** __これも強調です。__ <strong>strongタグです。</strong>
- *斜体 italicです。* _これも斜体です。_ <i>iタグです。</i>
- ***強調斜体です。*** ___強調斜体です。___ <em>emタグです。</em>
- ~~対応に差があるみたいだけど取り消し線。~~ <s>sタグです。</s>

- 箇条書きリスト
* 箇条書きリスト
    - 二階層め・箇条書きリスト
+ 箇条書きリスト

---

1. 番号付きリスト
1. 番号付きリスト
	1. 二階層め・番号付きリスト
		1. 三階層め・番号付きリスト
		1. 三階層め・番号付きリスト
	1. 二階層め・番号付きリスト
1. 番号付きリスト

---

テキストリンク [WIRED.jp](http://wired.jp/ "WIRED.jp")```

![うきっ！](http://mkb.salchu.net/image/salchu_image02.jpg "salchu_image02.jpg")
```

#### Diagram (flowchart)
```
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```

#### Diagram (sequence)
```
sequenceDiagram
    participant Alice
    participant Bob
    Alice->John: Hello John, how are you?
    loop Healthcheck
        John->John: Fight against hypochondria
    end
    Note right of John: Rational thoughts <br/>prevail...
    John-->Alice: Great!
    John->Bob: How about you?
    Bob-->John: Jolly good!
```

#### Diagram (gantt)
```
gantt
        dateFormat  YYYY-MM-DD
        title Adding GANTT diagram functionality to mermaid
        section A section
        Completed task            :done,    des1, 2014-01-06,2014-01-08
        Active task               :active,  des2, 2014-01-09, 3d
        Future task               :         des3, after des2, 5d
        Future task2               :         des4, after des3, 5d
        section Critical tasks
        Completed task in the critical line :crit, done, 2014-01-06,24h
        Implement parser and jison          :crit, done, after des1, 2d
        Create tests for parser             :crit, active, 3d
        Future task in critical line        :crit, 5d
        Create tests for renderer           :2d
        Add to mermaid                      :1d
```
