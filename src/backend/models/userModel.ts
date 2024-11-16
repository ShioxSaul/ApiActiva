import pool from "../config/configDb.js";
import { DeleteResult } from "../types/DeleteResult.js";
import { User } from "../types/user.js";

export async function saveNewUser(user: User): Promise<any> {
    const queryString = `
        INSERT INTO "user" ("userName", "name", "first_surname", "password", "email") 
        VALUES ('${user.userName}', '${user.name}', '${user.first_surname}', '${user.password}', '${user.email}')
        RETURNING *`;
    const result = await pool.query(queryString);
    return result.rows[0];
}


export async function getUsers(): Promise<any> {  
    const queryString = `SELECT * FROM "user"`;
    const result = await pool.query(queryString);
    return result.rows;
}


export async function findUserById(id: string): Promise<any> {
    const queryString = `SELECT * FROM "user" WHERE "id" = ${id}`;
    const result = await pool.query(queryString);
    return result.rows.length > 0 ? result.rows[0] : null;
}



export async function deleteUserById(id: string): Promise<any> {
    const queryString = `DELETE FROM "user" WHERE "id" = ${id}`;  
    try {
        const result = await pool.query(queryString);
        if (result.rowCount === 0) {
            return (`El usuario con el  ID ${id} no se ha encontrado`);
        } else {
            return (`El usuario ID ${id} se ha elimiado correctamente.`);
    }} catch (error) {
        console.error(`Error  al borrar el usuario con ID ${id}:`, error);
        return (`Error al borrar el usuario con ID ${id}.`) ;
    }
}



export async function updateUserById(id: string, user: Partial<User>): Promise<any> {
    const fields = Object.entries(user)
        .filter(([key, value]) => value !== undefined)
        .map(([key, value]) => `"${key}" = '${value}'`)
        .join(", ");
    
    if (fields.length === 0) {
        throw new Error("No hay campos para actualizar");
    }

    const queryString = `UPDATE "user" SET ${fields} WHERE "id" = ${id} RETURNING *`;
    const result = await pool.query(queryString);
    return result.rows.length > 0 ? result.rows[0] : null;
}
