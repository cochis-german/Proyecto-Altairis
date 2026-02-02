# Etapa de compilación
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copiamos solo el archivo de proyecto para restaurar dependencias
COPY ["Altairis.Api.csproj", "./"]
RUN dotnet restore

# Ahora copiamos el resto del código y compilamos
COPY . .
RUN dotnet publish -c Release -o /app

# Etapa final (Imagen ligera para ejecución)
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app .

# Exponemos el puerto 8080 que configuramos en Program.cs
EXPOSE 8080
ENV ASPNETCORE_URLS=http://0.0.0.0:8080

ENTRYPOINT ["dotnet", "Altairis.Api.dll"]