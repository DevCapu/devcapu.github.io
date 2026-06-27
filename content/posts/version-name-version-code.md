---
title: "Version Name x Version Code no Android"
date: "2021-06-18"
tags: ["tech", "android", "release"]
excerpt: "Veja as principais diferenças entre Version Name e Version Code."
published: true
---

Ao publicar um aplicativo na [Play Store](https://play.google.com/store/?utm_source=latam_Med&utm_medium=hasem&utm_content=Jul1520&utm_campaign=Evergreen&pcampaignid=MKT-FDR-latam-br-1002290-Med-hasem-py-Evergreen-Jul1520-Text_Search_BKWS-41905086&gclid=CjwKCAjwiLGGBhAqEiwAgq3q_jRFkiDhXwnrqv1IfwAcy4Ur5CDjbEkFEV_vUKluTr3ENtkCEjudtBoCgSUQAvD_BwE&gclsrc=aw.ds) é obrigatório o uso de versionamento. Já que o projeto se encontra no dispositivo do usuário, caso ocorra alguma falha, nós como desenvolvedores podemos pedir a versão do aplicativo para o usuário e verificar as mudanças que foram feitas naquela versão e corrigi-la.

 Para definir a versão, nós podemos ir em `build.gradle` (o do módulo) e lá encontraremos:

```java
defaultConfig {
       //Código acima omitido...
       versionCode 1
       versionName "1.0.0"
			 //Código abaixo omitido...
    }
```

Aqui nós podemos ver duas configurações relacionadas a versão do app e nós **sempre** precisamos definir valores pra ambos, `versionCode`e `versionName` . Mas o que esses valores querem dizer? E por que tem dois? 

### Version Code

Um número positivo que usamos pra definir se uma versão é maior que outra versão. Quanto maior o número, mais recente é a versão. Esse número não é mostrado (e nem deveria ser) para os usuários. Nós definimos ele usando o `versionCode` . Você é livre pra definir qualquer valor pra ele, desde que o número seja maior que a versão antecessora. Você não consegue instalar uma versão menor do que a que já estiver no dispositivo e também não pode fazer upload pra Play Store de uma versão que já tenha sido usada.

### Version Name

A `versionName` é a versão que é mostrada aos usuários. Pode ser tanto uma uma string diretamente ou uma referência pra uma string. Esse atributo não tem outra função que não seja ser mostrada para o usuário. Uma recomendação é o uso do [versionamento semântico](https://semver.org/lang/pt-BR/).

### Bônus: Play Console version

Ao fazermos upload de uma nova versão no Google Play Console, também é necessário informar um nome pra versão. Esse nome não é mostrado para os usuários. Apenas é usado dentro da própria plataforma. Com essa versão,  fica mais fácil de identificar em qual passo essa versão está (teste interno, teste aberto, produção, etc). Uma recomendação é que você use o mesmo valor que foi usado no `versionName`.

![Screen Shot 2021-06-17 at 23.34.02](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/dm6xiz7znqawvir96ydv.png)
 

Referências:

[](https://developer.android.com/studio/publish/versioning)

[Versioning mobile app releases like a pro](https://gabrielleearnshaw.medium.com/versioning-mobile-app-releases-like-a-pro-25137766150a)

[Semantic Versioning 2.0.0](https://semver.org)


> A versão original desse artigo foi escrito para o dev.to e você pode encontrar [aqui](https://dev.to/devcapu/version-name-x-version-code-no-android-1pdi)
>
> -- <cite>Devcapu</cite>