# Etapa de compilación
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# 1. Copiamos el proyecto y restauramos (capa de caché)
# Al estar el contexto en la carpeta del proyecto, el archivo está en la raíz del contexto
COPY Altairis.Api.csproj ./
RUN dotnet restore

# 2. Copiamos el resto del código y compilamos
COPY . .
RUN dotnet publish "Altairis.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Etapa final (Imagen ligera para ejecución)
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

# Seteamos variables de entorno para que escuche en el puerto correcto
ENV ASPNETCORE_URLS=http://+:8080
ENV ASPNETCORE_ENVIRONMENT=Production

# Copiamos los archivos publicados desde la etapa build
COPY --from=build /app/publish .

# Exponemos el puerto
EXPOSE 8080

# El nombre de la DLL debe coincidir exactamente con el nombre de tu proyecto
ENTRYPOINT ["dotnet", "Altairis.Api.dll"]