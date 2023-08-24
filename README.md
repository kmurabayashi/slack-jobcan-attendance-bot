## 概要
勤怠管理をjobcan, 日頃のコミュニケーションをslackで行っており
slack上でjobcan_touchで打刻を行う際に誰が打刻をしたかを管理者に教えてくれるslack botです。

## Usage

```shell
slack run
```

Test:

```shell
deno test
```

Deploy

```shell
slack deploy
```

Add a trigger:

```shell
slack trigger create --trigger-def ./src/triggers/schedule.ts
```
