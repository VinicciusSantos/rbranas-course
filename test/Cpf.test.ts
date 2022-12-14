import Cpf from "../src/Cpf"

describe('CPF Validation', () => {
  it('should validate the cpf A', () => {
    const cpf = new Cpf('935.411.347-80')
    expect(cpf.value).toEqual('935.411.347-80')
  })
  
  it('should validate the cpf B', () => {
    const cpf = new Cpf('357.188.378-05')
    expect(cpf.value).toEqual('357.188.378-05')
  })
  
  it('should validate the cpf C', () => {
    const cpf = new Cpf('987.654.321-00')
    expect(cpf.value).toEqual('987.654.321-00')
  })
  
  it('should not validate the cpf D', () => {
    const cpf = '987.654.321-10'
    expect(() => new Cpf(cpf)).toThrow(new Error('Invalid CPF'))
  })
  
  it('should not validate the cpf E', () => {
    const cpf = '987a654b321c10'
    expect(() => new Cpf(cpf)).toThrow(new Error('Invalid CPF'))
  })
  
  it('should not validate the cpf F', () => {
    const cpf = '111.111.111-11'
    expect(() => new Cpf(cpf)).toThrow(new Error('Invalid CPF'))
  })
  
  it('should not validate the cpf G', () => {
    const cpf: any = null
    expect(() => new Cpf(cpf)).toThrow(new Error('Invalid CPF'))
  })
  
  it('should not validate the cpf H', () => {
    const cpf = '987654321000'
    expect(() => new Cpf(cpf)).toThrow(new Error('Invalid CPF'))
  })
  
  it('should not validate the cpf I', () => {
    const cpf = '987.654.321-000'
    expect(() => new Cpf(cpf)).toThrow(new Error('Invalid CPF'))
  })
})
