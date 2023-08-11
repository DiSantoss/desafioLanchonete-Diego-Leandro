


class CaixaDaLanchonete {
    calcularValorDaCompra(metodoDePagamento, itens) {
        const cardapio = {
            'cafe': 3.00,
            'chantily': 1.50,
            'suco': 6.20,
            'sanduiche': 6.50,
            'queijo': 2.00,
            'salgado': 7.25,
            'combo1': 9.50,
            'combo2': 7.50
        };

        if (itens.length === 0) {
            return "Não há itens no carrinho de compra!";
        }

        let valorTotal = 0;
        let temPrincipal = false;
        let temCafeOuSanduiche = false;
        let temChantilyOuQueijo = false;

        for (const item of itens) {
            const [codigo, quantidade] = item.split(",");
            
            if (cardapio[codigo] === undefined) {
                return "Item inválido!";
            }

            if (quantidade <= 0) {
                return "Quantidade inválida!";
            }

            valorTotal += cardapio[codigo] * parseFloat(quantidade);

            if (codigo !== 'chantily' && codigo !== 'queijo') {
                temPrincipal = true;
            }

            if (codigo === 'cafe' || codigo === 'sanduiche') {
                temCafeOuSanduiche = true;
            }

            if (codigo === 'chantily' || codigo === 'queijo') {
                temChantilyOuQueijo = true;
            }
        }

        if (!temPrincipal) {
            return "Item extra não pode ser pedido sem o principal";
        }

        if (temChantilyOuQueijo && !temCafeOuSanduiche && !itens.some(item => item.startsWith('cafe') || item.startsWith('sanduiche'))) {
            return "Item extra não pode ser pedido sem o principal";
        }

        if (metodoDePagamento === "dinheiro") {
            valorTotal *= 0.95;
        } else if (metodoDePagamento === "credito") {
            if (valorTotal === 0) {
                return "Item inválido!";
            }
            valorTotal *= 1.03;
        } else if (metodoDePagamento !== "debito") {
            return "Forma de pagamento inválida!";
        }

        return `R$ ${valorTotal.toFixed(2).replace('.', ',')}`;
    }
}



export { CaixaDaLanchonete };


