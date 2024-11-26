class CotizacionClass {
    constructor(nombreEmpleado, nombreCliente, vehiculoDescripcion, cotizacionId, empleadoId, clienteId, vehiculoId, fechaCotizacion, estadoCotizacion, fechaSeguimiento, noFactura, precioPlacas, precioCotizacion, coloresDisponibles)
    {
        this.nombreEmpleado = nombreEmpleado;
        this.nombreCliente = nombreCliente;
        this.vehiculoDescripcion = vehiculoDescripcion;
        this.cotizacionId = cotizacionId;
        this.empleadoId = empleadoId;
        this.clienteId = clienteId;
        this.vehiculoId = vehiculoId;
        this.fechaCotizacion = fechaCotizacion;
        this.estadoCotizacion = estadoCotizacion;
        this.fechaSeguimiento = fechaSeguimiento;
        this.noFactura = noFactura;
        this.precioPlacas = precioPlacas;
        this.precioCotizacion = precioCotizacion;
        this.coloresDisponibles = coloresDisponibles;
    }

    seguimientos = null;

    agregarSeguimientos(seguimientos){
        this.seguimientos = seguimientos;
    }
}

export default CotizacionClass;