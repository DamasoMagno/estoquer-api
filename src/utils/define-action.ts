import prisma from "../prisma";

interface ActionProps {
  userId: string;
  entityName: string;
  action: "CREATE" | "UPDATE" | "DELETE";
  entity: "PRODUCT" | "SUPPLIER" | "STOCK";
}

const ACTIONS = {
  CREATE: {
    SUPPLIER: "cadastrou no sistema o novo fornecedor",
    PRODUCT: "cadastrou no sistema o novo produto",
    STOCK: "atualizou no estoque a quantidade do produto",
  },
  UPDATE: {
    SUPPLIER: "atualizou informações do fornecedor",
    PRODUCT: "atualizou informações do produto",
    STOCK: "atualizou no estoque a quantidade do produto",
  },
  DELETE: {
    SUPPLIER: "removeu do sistema o fornecedor",
    PRODUCT: "removeu do sistema o produto",
    STOCK: "atualizou no estoque a quantidade do produto",
  },
};

export async function createLog({
  action,
  entity,
  userId,
  entityName,
}: ActionProps) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user || !user.name) {
      console.error("Usuário não encontrado ou sem nome definido.");
      return;
    }

    const message = `O usuário ${user.name} ${ACTIONS[action][entity]} ${entityName}`;

    await prisma.audit.create({
      data: {
        userId,
        action: message,
      },
    });

    console.log("Log de auditoria criado com sucesso.");
  } catch (error) {
    console.error("Erro ao criar log de auditoria:", error);
  }
}
