function receberDados() {
     // object com dados dos inputs
    var dados = {
        nu_dentes_pinhao: Number(document.getElementById('n-dentes-p').value), //adimensional
        nu_dentes_coroa:  Number(document.getElementById('n-dentes-c').value), //adimensional
        aplicação: Number(document.aplicação.carga.value), //adimensional
        operação_diaria: Number(document.getElementById('operacao-diaria').value), //horas
        duração_prevista: Number(document.getElementById('duracao-prevista').value), //horas
        largura_diametro: Number(document.getElementById('largura-diametro').value), //adimensional
        apoio: Number(document.getElementById('Apoio').value), // pega a relação largura-diâmetro referência
        tensao_admissivel: Number(document.material.tipo.value), // tensão em n/mm**2
        dureza: Number(document.getElementById('dureza').value), // dureza em HB [n/mm**2]
        potencia: Number(document.querySelector('#potencia').value), // esta em Kw, o calculo é em w
        rotação: Number(document.getElementById('rpm').value), // rotações em rpm
        tipo_motor: Number(document.tipomotor.motor.value) //pega o valor mas a lógica não é usada
    }
    if(dados.nu_dentes_pinhao< 18 || dados.nu_dentes_pinhao>40){
        let res = document.getElementById('seção-resultados')
            res.style.display = "none"
        let botãoGeo = document.getElementById('button-submit2')
            botãoGeo.style.display = "none"
        let divGeo = document.getElementById('caracteristicas-geometricas')
            divGeo.style.display = "none"
        let folhas = document.getElementById('folhas-processos')
            folhas.style.display = "none"
        alert('ERRO - Número de dentes do pinhão não funciona com este dimensionamento [números validos estão entre 18 e 40]')
    }else{
    //Faz aparecer o display dos resultados
    let res = document.getElementById('seção-resultados')
        res.style.display = "block"
    let botãoGeo = document.getElementById('button-submit2')
        botãoGeo.style.display = "none"
    let divGeo = document.getElementById('caracteristicas-geometricas')
        divGeo.style.display = "none"
    let folhas = document.getElementById('folhas-processos')
        folhas.style.display = "none"
    
    let apoio = Number(dados.apoio)
    let tensao_adm = Number(dados.tensao_admissivel)
    let relaçao_transmissão = (dados.nu_dentes_coroa/dados.nu_dentes_pinhao)
    let w = (60*dados.rotação*dados.duração_prevista)/(Math.pow(10, 6)) //fator de durabilidade
    let pressão_adm = (0.487*dados.dureza)/(Math.pow(w, 1/6)) // n/mm**2
    let torque = (30000/Math.PI)*((dados.potencia*1000)/dados.rotação) // torque em N x mm
    // condição para o fator de serviço
    var fator_serviço = dados.aplicação
    if(dados.operação_diaria>12){
        fator_serviço = (fator_serviço + 0.25)
    }else{
        fator_serviço = fator_serviço
    }
    let volume_minimo = (572000) * (torque/(pressão_adm**2)) * ((relaçao_transmissão+1)/(relaçao_transmissão+0.14)) * (fator_serviço) // em mm**3
    let diametro_primitivo = Math.pow((volume_minimo/dados.largura_diametro), 1/3) 
    var modulo = (diametro_primitivo/dados.nu_dentes_pinhao).toFixed(4) // [mm]
    var diametroFresa = 0  // [mm]
    if(1.1< modulo && modulo <=1.26){
        modulo = 1.25
        diametroFresa = 50
    }else if(1.26 < modulo && modulo <=1.51){
        modulo = 1.50
        diametroFresa = 60
    }else if(1.51 < modulo && modulo <= 2.1){
        modulo = 2
        diametroFresa = 60
    }else if(2.1 < modulo && modulo <=2.26){
        modulo = 2.25
        diametroFresa = 60
    }else if(2.26 < modulo && modulo <=2.51){
        modulo = 2.50
        diametroFresa = 65
    }else if(2.51 < modulo && modulo <=2.76){
        modulo = 2.75
        diametroFresa = 70
    }else if(2.76 < modulo && modulo <=3.2){
        modulo = 3
        diametroFresa = 70
    }else if(3.2 < modulo && modulo <= 3.26){
        modulo = 3.25
        diametroFresa = 75
    }else if(3.26 < modulo && modulo <= 3.51){
        modulo = 3.50
        diametroFresa = 75
    }else if(3.51 < modulo && modulo <= 3.76){
        modulo = 3.75
        diametroFresa = 80
    }else if(3.76 < modulo && modulo <= 4.1){
        modulo = 4
        diametroFresa = 80
    }else if(4.1 < modulo && modulo <= 4.6){
        modulo = 4.5
        diametroFresa = 85
    }else if(4.6 < modulo && modulo <= 5.1){
        modulo = 5
        diametroFresa = 90
    }else if(5.1 < modulo && modulo <= 5.6){
        modulo = 5.5
        diametroFresa = 95
    }else if(5.6 < modulo && modulo <= 6.1){
        modulo = 6
        diametroFresa = 100
    }else if(6.1 < modulo && modulo <= 6.6){
        modulo = 6.5
    }else if(6.6 < modulo && modulo <= 7.1){
        modulo = 7
        diametroFresa = 105
    }else if(7.1 < modulo && modulo <= 8.1){
        modulo = 8
        diametroFresa = 110
    }else if(8.1 < modulo && modulo <= 9.1){
        modulo = 9
        diametroFresa = 115
    }else if(9.1 < modulo && modulo <= 10.1){
        modulo = 10
        diametroFresa = 120
    }else if(10.1 < modulo && modulo <= 11.1){
        modulo = 11
        diametroFresa = 135
    }else if(11.1 < modulo && modulo <= 12.1){
        modulo = 12
        diametroFresa = 145
    }else if(12.1 < modulo && modulo <= 13.1){
        modulo = 13
        diametroFresa = 155
    }else if(13.1 < modulo && modulo <= 14.1){
        modulo = 14
        diametroFresa = 160
    }else if(14.1 < modulo && modulo <= 15.1){
        modulo = 15
        diametroFresa = 165
    }else if(15.1 < modulo && modulo <= 16.1){
        modulo = 16
        diametroFresa = 170
    }

    var diametro_primitivo_normalizado_pinhão = modulo * dados.nu_dentes_pinhao
    var diametro_primitivo_normalizado_coroa = modulo * dados.nu_dentes_coroa
    var largura_pinhao = (volume_minimo)/(Math.pow(diametro_primitivo_normalizado_pinhão, 2)) // verificar um método melhor para aredondar
    let forca_tangencial = (2 * torque)/(diametro_primitivo_normalizado_pinhão)
    let forca_radial = forca_tangencial * 0.34906585 // força radial = força tangencial X tan(20°)

    // fator de forma q
    var fatorq = 3
    if (dados.nu_dentes_pinhao>=18 && dados.nu_dentes_pinhao<= 21) {
        var incremento = (3.5 - 3.3)/3
        var fatorq = 3.5

        switch (dados.nu_dentes_pinhao) {
            case 18:
                fatorq = 3.5
                break;
            case 19:
                fatorq = (3.5 - incremento)
                break;
            case 20:
                fatorq = 3.5 - (incremento*2)
                break;
            case 21:
                fatorq = 3.5 - (incremento*3)
                break;
            default:
               fatorq =  3.5
                break;
        }
    }
    
    if(dados.nu_dentes_pinhao>=22 && dados.nu_dentes_pinhao<=24){
        var incremento = (3.3 - 3.2)/3
        var fatorq = 3.3

        switch (dados.nu_dentes_pinhao){
            case 22:
                fatorq = (3.3 - incremento)
                break;
            case 23: 
                fatorq = 3.3 - (incremento*2)
                break;
            case 24:
                fatorq = 3.3 - (incremento*3)
                break;
            default:
                fatorq = 3.3
                break;
        }
    }

    if (dados.nu_dentes_pinhao>=25 && dados.nu_dentes_pinhao<=28){
        var incremento = (3.2 - 3.1)/4
        var fatorq = 3.2

        switch (dados.nu_dentes_pinhao){
            case 25:
                fatorq = (3.2 - incremento)
            break;
            case 26:
                fatorq = 3.2 - (incremento*2)
            break;
            case 27:
                fatorq = 3.2 - (incremento*3)
            break;
            case 28:
                fatorq = 3.2 - (incremento*4)
            break;
            default:
                fatorq = 3.2
            break;
        }
    }

    if (dados.nu_dentes_pinhao>=29 && dados.nu_dentes_pinhao<= 34){
        var incremento = (3.1 - 3)/6
        var fatorq = 3.1

        switch (dados.nu_dentes_pinhao) {
            case 29:
                fatorq = (3.1 - incremento)
            break;
            case 30:
                fatorq = 3.1 - (incremento*2)
            break;
            case 31:
                fatorq = 3.1 - (incremento*3)
            break;
            case 32:
                fatorq = 3.1 - (incremento*4)
            break;
            case 33:
                fatorq = 3.1 - (incremento*5)
            break;
            case 34:
                fatorq = 3.1 - (incremento*6)
            break;
            default:
                fatorq = 3.1
            break;
        }
    }

    if(dados.nu_dentes_pinhao>=35 && dados.nu_dentes_pinhao<= 40){
        var incremento = (3 - 2.9)/6
        var fatorq = 3
        
        switch (dados.nu_dentes_pinhao) {
            case 35:
                fatorq = (3 - incremento)
            break;
            case 36:
                fatorq = 3 - (incremento*2)
            break;
            case 37:
                fatorq = 3 - (incremento*3)
            break;
            case 38:
                fatorq = 3 - (incremento*4)
            break;
            case 39:
                fatorq = 3 - (incremento*5)
            break;
            case 40:
                fatorq = 3 - (incremento*6)
            break;
            default:
                fatorq = 3
            break;
        }
    }
    //análise do dimensionamento
    let tensãoPedoDente = (forca_tangencial*fatorq*fator_serviço)/(largura_pinhao*modulo)

    if(tensãoPedoDente>dados.tensao_admissivel){
        var aguenta = 'NÃO'
    }else{
        var aguenta = 'SIM'
    }

    if(aguenta === 'NÃO'){
        let redimensionar = document.getElementById('redimensionar')
        redimensionar.style.display = 'block'
    }else if(aguenta === 'SIM'){
        let redimensionar = document.getElementById('redimensionar')
        redimensionar.style.display = 'none'
    }
    
    let printResults = document.querySelectorAll('h4')
    printResults.item(0).innerHTML = `${relaçao_transmissão.toFixed(3)}`
    printResults.item(1).innerHTML = `${w.toFixed(3)}`
    printResults.item(2).innerHTML = `${pressão_adm.toFixed(3)} <em>N/mm²</em>`
    printResults.item(3).innerHTML = `${fator_serviço}`
    printResults.item(4).innerHTML = `${torque.toFixed(3)} <em>N x mm</em>`
    printResults.item(5).innerHTML = `${dados.tensao_admissivel} <em>N/mm²</em>`
    printResults.item(6).innerHTML = `${fatorq.toFixed(4)}`
    printResults.item(7).innerHTML = `${forca_tangencial.toFixed(3)} <em>N</em>`
    printResults.item(8).innerHTML = `${forca_radial.toFixed(3)} <em>N</em>`
    printResults.item(9).innerHTML = `${volume_minimo.toFixed(3)} <em>mm<sup>3</sup></em>`
    printResults.item(10).innerHTML = `${diametro_primitivo_normalizado_pinhão} <em>mm</em>`
    printResults.item(11).innerHTML = `${modulo} <em>mm</em>`
    printResults.item(12).innerHTML = `${largura_pinhao.toFixed(1)} <em>mm</em>`
    printResults.item(13).innerHTML = `${tensãoPedoDente.toFixed(3)} <em>N/mm²</em>`
    printResults.item(14).innerHTML = `${aguenta}`

    //let botãoGeo = document.getElementById('button-submit2')
    if (aguenta === "SIM"){
        botãoGeo.style.display = "block" //faz aparecer o botão para mostrar caracteristicas geométricasz
    }else if(aguenta === "NÃO"){
        largura_pinhao = (forca_tangencial*fatorq*fator_serviço)/(tensao_adm*modulo)// largura redimensionada
        let printResults = document.querySelectorAll('h4')// pega todas a caixas de resultados
        printResults.item(12).innerHTML = `${largura_pinhao.toFixed(1)} <em>mm</em>`//mostra a nova largura
        printResults.item(14).innerHTML = "SIM" // mostra que depois de redimensionar a ECDR aguenta os esforços
        let relaçãoLd = largura_pinhao/diametro_primitivo_normalizado_pinhão
        let condiçãoAprovação = document.querySelectorAll('p') //pega os texto dizem sobre a aprovação
        if(relaçãoLd<apoio){  //condição de aprovação[norma DIN para relação largura-diâmetro]
            condiçãoAprovação.item(0).style.display = "block" //o 0 é aprovado
            condiçãoAprovação.item(1).style.display = "none"// 0 1 é reprovado
            botãoGeo.style.display = "block" //faz aparecer o botão para mostrar caracteristicas geométricas
            let inputMaterial = document.getElementById('material') //pega o input do material
            inputMaterial.style.backgroundColor = "#a39f9f" // coloca a cor do input como cinza
        }else if(relaçãoLd>apoio){
            condiçãoAprovação.item(1).style.display = "block"
            condiçãoAprovação.item(0).style.display = "none"
            printResults.item(14).innerHTML = "NÃO"
            let inputMaterial = document.getElementById('material')
            inputMaterial.style.backgroundColor = "red" // coloca a cor do input como vermelho
        }   
    }
    botãoGeo.addEventListener("click", check)
    function check(){
        let divGeo = document.getElementById('caracteristicas-geometricas')
        divGeo.style.display = "block" // mostra as caracteristicas geométricas [tabela e imagens]
        let linhasGeometria = document.getElementById('table').getElementsByTagName('td') //pega as liinhas da tabela [tem três colunas, a da esquerda das os rotulos] (começa no 1)
        let cos20 = Math.cos((20 * Math.PI) / 180 )
        //definição das caracteristicas
        let passo = (modulo*Math.PI) //t0
        let vãoDentes = (passo/2) //l0
        let alturaCabeça = modulo //hk
        let alturaPe = (modulo*1.2) //hf
        let alturaComumDente = modulo*2  //h
        let alturatotalDente = (2.2*modulo)  // hz
        let espessura = (passo/2) //s0
        let folgaCabeça = (0.2 *modulo) //Sk
        let diametroBasePinhão = (diametro_primitivo_normalizado_pinhão * cos20) // Dg
        let diametroBaseCoroa = (diametro_primitivo_normalizado_coroa * cos20) // Dg
        let diametroInternoPinhão = (diametro_primitivo_normalizado_pinhão - (2.4*modulo)) //Df
        let diametroInternoCoroa = (diametro_primitivo_normalizado_coroa - (2.4 * modulo)) //Df
        let diametroExternoPinhão = (diametro_primitivo_normalizado_pinhão + (2*modulo)) //Dk
        let diametroExternoCoroa = (diametro_primitivo_normalizado_coroa + (2*modulo)) // Dk
        let distanciaCentros = ((diametro_primitivo_normalizado_pinhão+diametro_primitivo_normalizado_coroa)/2).toFixed(3) // A
        
        //printando resultados
        linhasGeometria.item(1).innerHTML = `d<sub>01</sub> = ${diametro_primitivo_normalizado_pinhão} mm`
        linhasGeometria.item(2).innerHTML = `d<sub>02</sub> = ${diametro_primitivo_normalizado_coroa} mm`
        linhasGeometria.item(4).innerHTML = `d<sub>g1</sub> = ${diametroBasePinhão.toFixed(2)} mm`
        linhasGeometria.item(5).innerHTML = `d<sub>g2</sub> = ${diametroBaseCoroa.toFixed(2)} mm`
        linhasGeometria.item(7).innerHTML = `d<sub>f1</sub> = ${diametroInternoPinhão.toFixed(2)} mm`
        linhasGeometria.item(8).innerHTML = `d<sub>f2</sub> = ${diametroInternoCoroa.toFixed(2)} mm`
        linhasGeometria.item(10).innerHTML = `d<sub>k1</sub> = ${diametroExternoPinhão.toFixed(2)} mm`
        linhasGeometria.item(11).innerHTML = `d<sub>k2</sub> = ${diametroExternoCoroa.toFixed(2)} mm`
        linhasGeometria.item(13).innerHTML = `A = ${distanciaCentros} mm`
        linhasGeometria.item(15).innerHTML = `t<sub>0</sub> = ${passo.toFixed(2)} mm`
        linhasGeometria.item(17).innerHTML = `l<sub>0</sub> = ${vãoDentes.toFixed(2)} mm`
        linhasGeometria.item(19).innerHTML = `h<sub>k</sub> = ${alturaCabeça.toFixed(2)} mm`
        linhasGeometria.item(21).innerHTML = `h<sub>f</sub> = ${alturaPe.toFixed(2)} mm`
        linhasGeometria.item(23).innerHTML = `h<sub></sub> = ${alturaComumDente.toFixed(2)} mm`
        linhasGeometria.item(25).innerHTML = `h<sub>z</sub> = ${alturatotalDente.toFixed(2)} mm`
        linhasGeometria.item(27).innerHTML = `s<sub>0</sub> = ${espessura.toFixed(2)} mm`
        linhasGeometria.item(29).innerHTML = `s<sub>k</sub> = ${folgaCabeça.toFixed(2)} mm`

        //////////////////////////////////////////////////
        var textMaterial = document.getElementsByTagName('j')
        let descrição = document.getElementsByClassName('conteudo-descrição')
        let textParametros = document.getElementsByClassName('conteudo-parametros')
        // parametros para torno
        var torno = {velCorteFaceamento: 0 ,        // [m/min]
                    velCorteFuro: 0 ,               // [m/min]
                    velCorteCorte:0 ,               // [m/min]
                    rpmFaceamento:0 ,               // [rot/min]  
                    rpmFuro:0 ,                     // [rot/min]
                    rpmCorte:0 ,                    // [rot/min]
                    avançoRotaçãoFaceamento: 0.35 , // [mm/rot]
                    avançoRotaçãoCorte: 0.1 ,       // [mm/rot]
                    velavançoFaceamento: 0          // [mm/min]
        }
        var fresadora = {velCorte: 0 ,        // [m/min] 
                        avançoPorDente: 0 ,   // [mm/dente]
                        rpm: 0 ,              // [rot/min]
                        velAvanço: 0          // [mm/min]
        }
        switch(dados.tensao_admissivel){
            case 40:
                for (let i= 0; i<6 ; i++){
                    textMaterial.item(i).innerHTML = "Material do produto: Ferro fundido cinzento"
                }
                /////////////////////////////
                torno.velCorteFaceamento = 58
                torno.velCorteFuro = 20
                torno.velCorteCorte = 132
                torno.rpmFaceamento = ((torno.velCorteFaceamento*1000)/(diametroExternoPinhão*Math.PI))
                torno.rpmFuro = ((torno.velCorteFuro*1000)/(diametroExternoPinhão*Math.PI))
                torno.rpmCorte = ((torno.velCorteCorte*1000)/(diametroExternoPinhão*Math.PI))           
                torno.velavançoFaceamento = (torno.avançoRotaçãoFaceamento*torno.rpmFaceamento)
                /////////////////////////
                fresadora.velCorte = 12
                fresadora.avançoPorDente = 0.05
                fresadora.rpm = ((fresadora.velCorte*1000)/(diametroFresa*Math.PI))
                fresadora.velAvanço = (fresadora.rpm*fresadora.avançoPorDente*12)
                ///////////////////////
                textParametros[1].innerHTML = `Velocidade de corte = ${torno.velCorteFaceamento} [m/min]
                </br> Velocidade do fuso = ${torno.rpmFaceamento.toFixed(0)} [rot/min] </br>
                avanço = ${torno.avançoRotaçãoFaceamento} [mm/rot] </br>
                Velocidade de avanço = ${torno.velavançoFaceamento.toFixed(0)}[mm/min] `
                //////////////////////
                textParametros[2].innerHTML = `Velocidade de corte = ${torno.velCorteFaceamento} [m/min]
                </br> Velocidade do fuso = ${torno.rpmFaceamento.toFixed(0)} [rot/min] </br>
                avanço = ${torno.avançoRotaçãoFaceamento} [mm/rot] </br>
                Velocidade de avanço = ${torno.velavançoFaceamento.toFixed(0)} [mm/min]`
                /////////////////////
                textParametros[3].innerHTML = `Velocidade de corte = ${torno.velCorteFuro} [m/min]
                </br> Velocidade do fuso = ${torno.rpmFuro.toFixed(0)} [rot/min]` 
                /////////////////////
                textParametros[4].innerHTML = `Velocidade de corte = ${torno.velCorteCorte} [m/min]
                </br> Velocidade do fuso = ${torno.rpmCorte.toFixed(0)} [rot/min] </br>
                avanço = ${torno.avançoRotaçãoCorte} [mm/rot] </br>`
                ////////////////////
                textParametros[5].innerHTML = `Velocidade de corte = ${fresadora.velCorte} [m/min]
                </br> Velocidade do fuso = ${fresadora.rpm.toFixed(0)} [rot/min] </br>
                avanço por dente = ${fresadora.avançoPorDente} [mm/dente] </br>
                Velocidade de avanço = ${fresadora.velAvanço.toFixed(0)} [mm/min]`
            break;
            case 80: 
                for (let i= 0; i<6 ; i++){
                    textMaterial.item(i).innerHTML = "Material do produto: Fofo nodular"
                }
                /////////////////////////////
                torno.velCorteFaceamento = 50
                torno.velCorteFuro = 20
                torno.velCorteCorte = 130
                torno.rpmFaceamento = ((torno.velCorteFaceamento*1000)/(diametroExternoPinhão*Math.PI))
                torno.rpmFuro = ((torno.velCorteFuro*1000)/(diametroExternoPinhão*Math.PI))
                torno.rpmCorte = ((torno.velCorteCorte*1000)/(diametroExternoPinhão*Math.PI))           
                torno.velavançoFaceamento = (torno.avançoRotaçãoFaceamento*torno.rpmFaceamento)
                /////////////////////////
                fresadora.velCorte = 14
                fresadora.avançoPorDente = 0.06
                fresadora.rpm = ((fresadora.velCorte*1000)/(diametroFresa*Math.PI))
                fresadora.velAvanço = (fresadora.rpm*fresadora.avançoPorDente*12)
                ///////////////////////
                textParametros[1].innerHTML = `Velocidade de corte = ${torno.velCorteFaceamento} [m/min]
                </br> Velocidade do fuso = ${torno.rpmFaceamento.toFixed(0)} [rot/min] </br>
                avanço = ${torno.avançoRotaçãoFaceamento} [mm/rot] </br>
                Velocidade de avanço = ${torno.velavançoFaceamento.toFixed(0)} [mm/min]`
                //////////////////////
                textParametros[2].innerHTML = `Velocidade de corte = ${torno.velCorteFaceamento} [m/min]
                </br> Velocidade do fuso = ${torno.rpmFaceamento.toFixed(0)} [rot/min] </br>
                avanço = ${torno.avançoRotaçãoFaceamento} [mm/rot] </br>
                Velocidade de avanço = ${torno.velavançoFaceamento.toFixed(0)} [mm/min]`
                /////////////////////
                textParametros[3].innerHTML = `Velocidade de corte = ${torno.velCorteFuro} [m/min]
                </br> Velocidade do fuso = ${torno.rpmFuro.toFixed(0)} [rot/min]` 
                /////////////////////
                textParametros[4].innerHTML = `Velocidade de corte = ${torno.velCorteCorte} [m/min]
                </br> Velocidade do fuso = ${torno.rpmCorte.toFixed(0)} [rot/min] </br>
                avanço = ${torno.avançoRotaçãoCorte} [mm/rot] </br>`
                ////////////////////
                textParametros[5].innerHTML = `Velocidade de corte = ${fresadora.velCorte} [m/min]
                </br> Velocidade do fuso = ${fresadora.rpm.toFixed(0)} [rot/min] </br>
                avanço por dente = ${fresadora.avançoPorDente} [mm/dente] </br>
                Velocidade de avanço = ${fresadora.velAvanço.toFixed(0)} [mm/min]`
            break;
            case 90:
                for (let i= 0; i<6 ; i++){
                    textMaterial.item(i).innerHTML = "Material do produto: SAE 1010/1020"
                }
                /////////////////////////////
                torno.velCorteFaceamento = 96
                torno.velCorteFuro = 20
                torno.velCorteCorte = 219
                torno.rpmFaceamento = ((torno.velCorteFaceamento*1000)/(diametroExternoPinhão*Math.PI))
                torno.rpmFuro = ((torno.velCorteFuro*1000)/(diametroExternoPinhão*Math.PI))
                torno.rpmCorte = ((torno.velCorteCorte*1000)/(diametroExternoPinhão*Math.PI))           
                torno.velavançoFaceamento = (torno.avançoRotaçãoFaceamento*torno.rpmFaceamento)
                /////////////////////////
                fresadora.velCorte = 14
                fresadora.avançoPorDente = 0.06
                fresadora.rpm = ((fresadora.velCorte*1000)/(diametroFresa*Math.PI))
                fresadora.velAvanço = (fresadora.rpm*fresadora.avançoPorDente*12)
                ///////////////////////
                textParametros[1].innerHTML = `Velocidade de corte = ${torno.velCorteFaceamento} [m/min]
                </br> Velocidade do fuso = ${torno.rpmFaceamento.toFixed(0)} [rot/min] </br>
                avanço = ${torno.avançoRotaçãoFaceamento} [mm/rot] </br>
                Velocidade de avanço = ${torno.velavançoFaceamento.toFixed(0)} [mm/min]`
                //////////////////////
                textParametros[2].innerHTML = `Velocidade de corte = ${torno.velCorteFaceamento} [m/min]
                </br> Velocidade do fuso = ${torno.rpmFaceamento.toFixed(0)} [rot/min] </br>
                avanço = ${torno.avançoRotaçãoFaceamento} [mm/rot] </br>
                Velocidade de avanço = ${torno.velavançoFaceamento.toFixed(0)} [mm/min]`
                /////////////////////
                textParametros[3].innerHTML = `Velocidade de corte = ${torno.velCorteFuro} [m/min]
                </br> Velocidade do fuso = ${torno.rpmFuro.toFixed(0)} [rot/min]` 
                /////////////////////
                textParametros[4].innerHTML = `Velocidade de corte = ${torno.velCorteCorte} [m/min]
                </br> Velocidade do fuso = ${torno.rpmCorte.toFixed(0)} [rot/min] </br>
                avanço = ${torno.avançoRotaçãoCorte} [mm/rot] </br>`
                ////////////////////
                textParametros[5].innerHTML = `Velocidade de corte = ${fresadora.velCorte} [m/min]
                </br> Velocidade do fuso = ${fresadora.rpm.toFixed(0)} [rot/min] </br>
                avanço por dente = ${fresadora.avançoPorDente} [mm/dente] </br>
                Velocidade de avanço = ${fresadora.velAvanço.toFixed(0)} [mm/min]`
            break;
            case 120:
                for (let i= 0; i<6 ; i++){
                    textMaterial.item(i).innerHTML = "Material do produto: SAE 1040/1050"
                }
                /////////////////////////////
                torno.velCorteFaceamento = 110
                torno.velCorteFuro = 20
                torno.velCorteCorte = 172
                torno.rpmFaceamento = ((torno.velCorteFaceamento*1000)/(diametroExternoPinhão*Math.PI))
                torno.rpmFuro = ((torno.velCorteFuro*1000)/(diametroExternoPinhão*Math.PI))
                torno.rpmCorte = ((torno.velCorteCorte*1000)/(diametroExternoPinhão*Math.PI))           
                torno.velavançoFaceamento = (torno.avançoRotaçãoFaceamento*torno.rpmFaceamento)
                /////////////////////////
                fresadora.velCorte = 12
                fresadora.avançoPorDente = 0.05
                fresadora.rpm = ((fresadora.velCorte*1000)/(diametroFresa*Math.PI))
                fresadora.velAvanço = (fresadora.rpm*fresadora.avançoPorDente*12)
                ///////////////////////
                textParametros[1].innerHTML = `Velocidade de corte = ${torno.velCorteFaceamento} [m/min]
                </br> Velocidade do fuso = ${torno.rpmFaceamento.toFixed(0)} [rot/min] </br>
                avanço = ${torno.avançoRotaçãoFaceamento} [mm/rot] </br>
                Velocidade de avanço = ${torno.velavançoFaceamento.toFixed(0)} [mm/min]`
                //////////////////////
                textParametros[2].innerHTML = `Velocidade de corte = ${torno.velCorteFaceamento} [m/min]
                </br> Velocidade do fuso = ${torno.rpmFaceamento.toFixed(0)} [rot/min] </br>
                avanço = ${torno.avançoRotaçãoFaceamento} [mm/rot] </br>
                Velocidade de avanço = ${torno.velavançoFaceamento.toFixed(0)} [mm/min]`
                /////////////////////
                textParametros[3].innerHTML = `Velocidade de corte = ${torno.velCorteFuro} [m/min]
                </br> Velocidade do fuso = ${torno.rpmFuro.toFixed(0)} [rot/min]` 
                /////////////////////
                textParametros[4].innerHTML = `Velocidade de corte = ${torno.velCorteCorte} [m/min]
                </br> Velocidade do fuso = ${torno.rpmCorte.toFixed(0)} [rot/min] </br>
                avanço = ${torno.avançoRotaçãoCorte} [mm/rot] </br>`
                ////////////////////
                textParametros[5].innerHTML = `Velocidade de corte = ${fresadora.velCorte} [m/min]
                </br> Velocidade do fuso = ${fresadora.rpm.toFixed(0)} [rot/min] </br>
                avanço por dente = ${fresadora.avançoPorDente} [mm/dente] </br>
                Velocidade de avanço = ${fresadora.velAvanço.toFixed(0)} [mm/min]`
            break;
            case 170:
                for (let i= 0; i<6 ; i++) {
                    textMaterial.item(i).innerHTML = "Material do produto: SAE 4320/4340"
                }
                /////////////////////////////
                torno.velCorteFaceamento = 245
                torno.velCorteFuro = 20
                torno.velCorteCorte = 141
                torno.rpmFaceamento = ((torno.velCorteFaceamento*1000)/(diametroExternoPinhão*Math.PI))
                torno.rpmFuro = ((torno.velCorteFuro*1000)/(diametroExternoPinhão*Math.PI))
                torno.rpmCorte = ((torno.velCorteCorte*1000)/(diametroExternoPinhão*Math.PI))           
                torno.velavançoFaceamento = (torno.avançoRotaçãoFaceamento*torno.rpmFaceamento)
                /////////////////////////
                fresadora.velCorte = 12
                fresadora.avançoPorDente = 0.05
                fresadora.rpm = ((fresadora.velCorte*1000)/(diametroFresa*Math.PI))
                fresadora.velAvanço = (fresadora.rpm*fresadora.avançoPorDente*12)
                ///////////////////////
                textParametros[1].innerHTML = `Velocidade de corte = ${torno.velCorteFaceamento} [m/min]
                </br> Velocidade do fuso = ${torno.rpmFaceamento.toFixed(0)} [rot/min] </br>
                avanço = ${torno.avançoRotaçãoFaceamento} [mm/rot] </br>
                Velocidade de avanço = ${torno.velavançoFaceamento.toFixed(0)} [mm/min]`
                //////////////////////
                textParametros[2].innerHTML = `Velocidade de corte = ${torno.velCorteFaceamento} [m/min]
                </br> Velocidade do fuso = ${torno.rpmFaceamento.toFixed(0)} [rot/min] </br>
                avanço = ${torno.avançoRotaçãoFaceamento} [mm/rot] </br>
                Velocidade de avanço = ${torno.velavançoFaceamento.toFixed(0)} [mm/min]`
                /////////////////////
                textParametros[3].innerHTML = `Velocidade de corte = ${torno.velCorteFuro} [m/min]
                </br> Velocidade do fuso = ${torno.rpmFuro.toFixed(0)} [rot/min]` 
                /////////////////////
                textParametros[4].innerHTML = `Velocidade de corte = ${torno.velCorteCorte} [m/min]
                </br> Velocidade do fuso = ${torno.rpmCorte.toFixed(0)} [rot/min] </br>
                avanço = ${torno.avançoRotaçãoCorte} [mm/rot] </br>`
                ////////////////////
                textParametros[5].innerHTML = `Velocidade de corte = ${fresadora.velCorte} [m/min]
                </br> Velocidade do fuso = ${fresadora.rpm.toFixed(0)} [rot/min] </br>
                avanço por dente = ${fresadora.avançoPorDente} [mm/dente] </br>
                Velocidade de avanço = ${fresadora.velAvanço.toFixed(0)} [mm/min]`
            break;
            case 200:
                for (let i= 0; i<6 ; i++){
                    textMaterial.item(i).innerHTML = "Material do produto: SAE 8620/8640"
                }
                /////////////////////////////
                torno.velCorteFaceamento = 222
                torno.velCorteFuro = 20
                torno.velCorteCorte = 195
                torno.rpmFaceamento = ((torno.velCorteFaceamento*1000)/(diametroExternoPinhão*Math.PI))
                torno.rpmFuro = ((torno.velCorteFuro*1000)/(diametroExternoPinhão*Math.PI))
                torno.rpmCorte = ((torno.velCorteCorte*1000)/(diametroExternoPinhão*Math.PI))           
                torno.velavançoFaceamento = (torno.avançoRotaçãoFaceamento*torno.rpmFaceamento)
                /////////////////////////
                fresadora.velCorte = 12
                fresadora.avançoPorDente = 0.05
                fresadora.rpm = ((fresadora.velCorte*1000)/(diametroFresa*Math.PI))
                fresadora.velAvanço = (fresadora.rpm*fresadora.avançoPorDente*12)
                ///////////////////////
                textParametros[1].innerHTML = `Velocidade de corte = ${torno.velCorteFaceamento} [m/min]
                </br> Velocidade do fuso = ${torno.rpmFaceamento.toFixed(0)} [rot/min] </br>
                avanço = ${torno.avançoRotaçãoFaceamento} [mm/rot] </br>
                Velocidade de avanço = ${torno.velavançoFaceamento.toFixed(0)} [mm/min]`
                //////////////////////
                textParametros[2].innerHTML = `Velocidade de corte = ${torno.velCorteFaceamento} [m/min]
                </br> Velocidade do fuso = ${torno.rpmFaceamento.toFixed(0)} [rot/min] </br>
                avanço = ${torno.avançoRotaçãoFaceamento} [mm/rot] </br>
                Velocidade de avanço = ${torno.velavançoFaceamento.toFixed(0)} [mm/min]`
                /////////////////////
                textParametros[3].innerHTML = `Velocidade de corte = ${torno.velCorteFuro} [m/min]
                </br> Velocidade do fuso = ${torno.rpmFuro.toFixed(0)} [rot/min]` 
                /////////////////////
                textParametros[4].innerHTML = `Velocidade de corte = ${torno.velCorteCorte} [m/min]
                </br> Velocidade do fuso = ${torno.rpmCorte.toFixed(0)} [rot/min] </br>
                avanço = ${torno.avançoRotaçãoCorte} [mm/rot] </br>`
                ////////////////////
                textParametros[5].innerHTML = `Velocidade de corte = ${fresadora.velCorte} [m/min]
                </br> Velocidade do fuso = ${fresadora.rpm.toFixed(0)} [rot/min] </br>
                avanço por dente = ${fresadora.avançoPorDente} [mm/dente] </br>
                Velocidade de avanço = ${fresadora.velAvanço.toFixed(0)} [mm/min]`
            break;
            default:
                textMaterial.innerHTML = "ERRO $)$"
        }
        let larguraMaisQuatro = (largura_pinhao + 4).toFixed(1)
        let larguraMaisTres = (largura_pinhao + 3).toFixed(1)
        descrição[1].innerHTML = `Fixar o blank na placa universal do torno, alinhar a ferramenta ao
        centro geométrico da peça e usinar a face 1 até obter uma superfície lisa.</br> </br>
        Ds = diâmetro com sobremetal.`
        ////////////////
        descrição[2].innerHTML = `Com o torno desligado, tangenciar a ferramenta na peça, zerar
        a escala do avanço, afastar a ferramenta da peça, ligar o torno e usinar diâmetro externo até
        ${diametroExternoPinhão} mm avançando longitudinalmente ${larguraMaisQuatro} mm. </br> </br>
        L = ${largura_pinhao.toFixed(1)} mm </br>
        Ds = diâmetro com sobremetal </br>
        Dk = ${diametroExternoPinhão} mm`
        ///////////////
        descrição[3].innerHTML = `Montar o mandril no cabeçote do torno, fixar broca e realizar furos escalonados,
        sendo o diâmetro final o que encaixará no seu eixo e a profundidade final igual a ${larguraMaisTres} mm. </br> </br>
        Ds = diâmetro com sobremetal </br>
        Dk = ${diametroExternoPinhão} mm </br>
        Df = diâmetro do furo (para encaixe no eixo)`
        //////////////
        descrição[4].innerHTML = `Posicionar a ferramenta longitudinalmente a partir da face 1
        no ponto ${largura_pinhao.toFixed(1)} mm e cortar a peça realizando um canal de largura 4 mm. </br> </br>
        Ds = diâmetro com sobremetal </br>
        Dk = ${diametroExternoPinhão} mm </br>
        Df = diâmetro do furo (para encaixe no eixo)`
        /////////////////
        function discodivisor(numeroDentes){
            if(40%numeroDentes == 0){ //divisão exata?
              let voltasManivela = 40/numeroDentes
              return `dar ${voltasManivela} volta(s) na manivela do disco divisor`
            }else{ //divisão não exata
              let voltasManivela = Math.trunc(40/numeroDentes)
              let numeroFuros = 40%numeroDentes
              let fraçãoFurosDisco = [numeroFuros, numeroDentes] 
              
              function reduzir(numerator,denominator){
                var mdc = function mdc(a,b){
                  return b ? mdc (b, a%b) : a
                }
                mdc = mdc(numerator,denominator)
                return [numerator/mdc, denominator/mdc]
              }
              let x = reduzir(fraçãoFurosDisco[0], fraçãoFurosDisco[1])
              var disco = [15,16,17,18,19,20,21,23,27,29,31,33,37,39,41,42,43,47,49,51,53,57] 
              let temdisco = disco.includes(numeroDentes) // falso se não tiver e verdadeiro se tiver
              if(numeroDentes>40){ //quando é maior que 40 não da volta na manivela
                if(temdisco == true){
                  return `avançar ${x[0]} furos em um disco divisor de ${x[1]} furos`
                }else if(temdisco == false){
                  for (let i = 0; i < disco.length; i++) {
                    var divisão = (disco[i]/x[1])
                    if(Number.isInteger(divisão)){
                      i = disco.length
                    }
                  }
                  let novaFração = [x[0]*divisão, x[1]*divisão]
                  return `avançar ${novaFração[0]} furos em um disco divisor de ${novaFração[1]} furos`
                }
              }else{
                if(temdisco == true){
                  for (let i = 0; i < disco.length; i++) {
                    var divisão = (disco[i]/x[1])
                    if(Number.isInteger(divisão)){
                      i = disco.length
                    }
                  }
                  let novaFração = [x[0]*divisão, x[1]*divisão]
                  return `dar ${voltasManivela} volta(s) na manivela e avançar ${novaFração[0]} furos em um disco divisor de ${novaFração[1]} furos`
                }else if(temdisco == false){
                  for (let i = 0; i < disco.length; i++) {
                    var divisão = (disco[i]/x[1])
                    if(Number.isInteger(divisão)){
                      i = disco.length
                    }
                  }
                  let novaFração = [x[0]*divisão, x[1]*divisão]
                  return `dar ${voltasManivela} na manivela e avançar ${novaFração[0]} furos em um disco divisor de ${novaFração[1]} furos`
                }
                
              }
            }
        }
        let textoDiscodivisor = discodivisor(dados.nu_dentes_pinhao)
        descrição[5].innerHTML = `Fixar a peça no aparelho divisor, tangenciar a ferramenta
        na peça, zerar a escala do avanço, afastar a peça da ferramenta, fazer a primeira ranhura
        e  ${textoDiscodivisor} para fazer a segunda ranhura. Continuar o processo
        até o ultimo dente do pinhão. </br>
        L = ${largura_pinhao.toFixed(1)} mm </br>
        Dk = ${diametroExternoPinhão} mm </br>
        Df = diâmetro do furo (para encaixe no eixo)`
        let fresa = document.getElementById('fresa')
        if(dados.nu_dentes_pinhao >17 && dados.nu_dentes_pinhao <=20){
            fresa.innerHTML = `Fresa módulo ${modulo} | número 3 | aço rápido | 12 arrestas cortantes|`
        }else if(dados.nu_dentes_pinhao >20 && dados.nu_dentes_pinhao <=25){
            fresa.innerHTML = `Fresa módulo ${modulo} | número 4 | aço rápido | 12 arrestas cortantes|`
        }else if(dados.nu_dentes_pinhao >25 && dados.nu_dentes_pinhao <=34){
            fresa.innerHTML = `Fresa módulo ${modulo} | número 5 | aço rápido | 12 arrestas cortantes|`
        }else if(dados.nu_dentes_pinhao >34 && dados.nu_dentes_pinhao <=54){
            fresa.innerHTML = `Fresa módulo ${modulo} | número 6 | aço rápido | 12 arrestas cortantes|`
        }else if(dados.nu_dentes_pinhao >54 && dados.nu_dentes_pinhao <=134){
            fresa.innerHTML = `Fresa módulo ${modulo} | número 7 | aço rápido | 12 arrestas cortantes|`
        }
    }
    }
}

function gerarFolhas(){
    let folhas = document.getElementById('folhas-processos')
    folhas.style.display = "block"
}