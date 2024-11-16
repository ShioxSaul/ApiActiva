import pool from "../config/configDb.js";
import { DeleteResult } from "../types/DeleteResult.js";
import { Animals } from "../types/animal.js";

export async function saveNewAnimals(Animals: Animals): Promise<any> {
    const queryString = `
        INSERT INTO "Animals" ("animalname", "breed", "weight", "gender", "ownername") 
        VALUES ('${Animals.animalname}', '${Animals.breed}', '${Animals.weight}', '${Animals.gender}', '${Animals.ownername}')
        RETURNING *`;
    const result = await pool.query(queryString);
    return result.rows[0];
}


export async function getAnimal(): Promise<any> {  
    const queryString = `SELECT * FROM "Animals"`;
    const result = await pool.query(queryString);
    return result.rows;
}


export async function findAnimalById(id: string): Promise<any> {
    const queryString = `SELECT * FROM "Animals" WHERE "id" = ${id}`;
    const result = await pool.query(queryString);
    return result.rows.length > 0 ? result.rows[0] : null;
}



export async function deleteAnimalById(id: string): Promise<any> {
    const queryString = `DELETE FROM "Animals" WHERE "id" = ${id}`;  
    try {
        const result = await pool.query(queryString);
        if (result.rowCount === 0) {
            return (`El animal con el  ID ${id} no se ha encontrado`);
        } else {
            return (`El animal ID ${id} se ha elimiado correctamente.`);
    }} catch (error) {
        console.error(`Error  al borrar el animal con ID ${id}:`, error);
        return (`Error al borrar el animal con ID ${id}.`) ;
    }
}



export async function updateAnimalById(id: string, Animals: Partial<Animals>): Promise<any> {
    const fields = Object.entries(Animals)
        .filter(([key, value]) => value !== undefined)
        .map(([key, value]) => `"${key}" = '${value}'`)
        .join(", ");
    
    if (fields.length === 0) {
        throw new Error("No hay campos para actualizar");
    }

    const queryString = `UPDATE "Animals" SET ${fields} WHERE "id" = ${id} RETURNING *`;
    const result = await pool.query(queryString);
    return result.rows.length > 0 ? result.rows[0] : null;
}
