import { test, expect } from "@playwright/test"

test.describe.parallel("API testing", () => {
    const baseUrl = "https://reqres.in/api"

    test("Simple API Test - Assert Response Status", async ({ request }) => {
        const response = await request.get(`${baseUrl}/users/2`)
        expect(response.status()).toBe(200)        
    })

    test("Simple API Test - Assert Invalid Endpoint", async ({ request }) => {
        const response = await request.get(`${baseUrl}/users/non-existing-endpoint`)
        expect(response.status()).toBe(404)        
    })

    test("Simple API test - Parse response JSON data", async ({ request }) => {
        const response = await request.get(`${baseUrl}/users/3`)
        expect(response.status()).toBe(200)

        const responseBody = JSON.parse(await response.text())
        console.log(responseBody)        
    })

    test("GET Request - Get User Detail", async ({ request }) => {
        const response = await request.get(`${baseUrl}/users/2`)
        const responseBody = JSON.parse(await response.text())

        console.log(responseBody)

        expect(response.status()).toBe(200)
        expect(responseBody.data.id).toBe(2)
        expect(responseBody.data.first_name).toBe('Janet')
        expect(responseBody.data.last_name).toBe('Weaver')
        expect(responseBody.data.email).toBeTruthy()   
    })

    test("POST Request - Create New User", async ({ request }) => {
        const response = await request.post(`${baseUrl}/users`, {
            data: {
                name: 'Janet',
                job: 'baker'
            }
        })

        const responseBody = JSON.parse(await response.text())
        console.log(responseBody)

        expect(response.status()).toBe(201)        
    })

    test("POST Request - Login Successful", async ({ request }) => {
        const response = await request.post(`${baseUrl}/login`, {
            data: {
                email: "eve.holt@reqres.in",
                password: "cityslicka"
            }
        })

        const responseBody = JSON.parse(await response.text())
        console.log(responseBody)

        expect(response.status()).toBe(200)
        expect(responseBody.token).toBeTruthy()
    })

    test("POST Request - Login Unsuccessful", async ({ request }) => {
        const response = await request.post(`${baseUrl}/login`, {
            data: {
                email: "eve.holt@reqres.in"
            }
        })

        const responseBody = JSON.parse(await response.text())
        console.log(responseBody)

        expect(response.status()).toBe(400)  
        expect(responseBody.error).toBe("Missing password")      
    })

    test("PUT Request - Update User", async ({ request }) => {
        const response = await request.put(`${baseUrl}/users/2`, {
            data: {
                name: "Judy",
                job: "teacher"
            }
        })

        const responseBody = JSON.parse(await response.text())
        console.log(responseBody)

        expect(response.status()).toBe(200)
        expect(responseBody.name).toBe("Judy")
        expect(responseBody.job).toBe("teacher")
        expect(responseBody.updatedAt).toBeTruthy()        
    })

    test("DELETE Request - Delete User", async ({ request }) => {
        const response = await request.delete(`${baseUrl}/users/2`)
        expect(response.status()).toBe(204)        
    })
})