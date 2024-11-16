import { deleteAnimalById, findAnimalById, getAnimal as getAllAnimalsModel, saveNewAnimals, updateAnimalById } from "../models/animalModel.js";
import { Animals } from "../types/animal.js";

export async function newAnimal(animal: Animals): Promise<any> {
    try {
      
        if (!animal.animalname || !animal.breed || !animal.gender || !animal.ownername) {
            return {
                error: "Campos requeridos faltantes",
                details: {
                    animalname: !animal.animalname ? "El nombre del animal es requerido" : null,
                    breed: !animal.breed ? "La raza es requerida" : null,
                    gender: !animal.gender ? "El género es requerido" : null,
                    ownername: !animal.ownername ? "El nombre del dueño es requerido" : null
                }
            };
        }

       
        if (animal.gender !== 'M' && animal.gender !== 'H') {
            return "El género debe ser 'M' o 'H'";
        }

     
        if (animal.weight !== null && isNaN(Number(animal.weight))) {
            return "El peso debe ser un número válido";
        }

        return await saveNewAnimals(animal);
    } catch (error: any) {
        if (error.code === "23505") {
            const columnMatch = error.detail.match(/Key \((.*?)\)=/);
            const columnName = columnMatch ? columnMatch[1] : 'campo';
            return `El ${columnName} ya existe en la base de datos.`;
        }
        return `Error al crear animal: ${error.message}`;
    }
}

export async function getAllAnimals(): Promise<any> {
    try {
        return await getAllAnimalsModel();
    } catch (error: any) {
        return `Error al obtener los animales: ${error.message}`;
    }
}

export async function getAnimalById(animalname: string): Promise<any> {
    try {
        const result = await findAnimalById(animalname);
        if (!result) {
            return `El animal ${animalname} no fue encontrado.`;
        }
        return result;
    } catch (error: any) {
        return `Error al obtener el animal: ${error.message}`;
    }
}

export async function deleteAnimal(animalname: string): Promise<any> {
    try {
        const result = await deleteAnimalById(animalname);
        return result;
    } catch (error) {
        return new Error("Error al eliminar el animal");
    }
}

export async function updateAnimal(animalname: string, animal: Partial<Animals>): Promise<any> {
    try {
        const result = await updateAnimalById(animalname, animal);
        if (!result) {
            return `No se pudo actualizar. El animal ${animalname} no existe.`;
        }
        return result;
    } catch (error: any) {
        if (error.code === "23505") {
            return `Ya existe un animal con ese valor único en la base de datos.`;
        }
        return `Error al actualizar el animal: ${error.message}`;
    }
}
