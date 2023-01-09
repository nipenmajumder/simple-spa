<?php

declare (strict_types=1);

namespace App\Traits;

use Error;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;
use Throwable;

/**
 * ApiResponse.
 *
 * @author  Ridoy Chandra Sarker<csridoy42@gmail.com>
 * @copyright Copyright (c) 2022
 */
trait ApiResponse
{
    /**
     * @param JsonResource $resource
     * @param string|null $message
     * @param int $statusCode
     * @param array $headers
     * @return JsonResponse
     */
    public function respondWithResource(
        JsonResource $resource,
        ?string      $message = null,
        int          $statusCode = 200,
        array        $headers = []
    ): JsonResponse
    {
        return $this->apiResponse(
            [
                "status" => true,
                "result" => [
                    "data" => $resource,
                ],
                "message" => $message,
            ],
            $statusCode,
            $headers
        );
    }

    /**
     * @param array $data
     * @param int $statusCode
     * @param array $headers
     * @return array
     */
    private function parseGivenData(
        array $data = [],
        int   $statusCode = 200,
        array $headers = []
    ): array
    {
        $response_structure = [
            "status" => $data["status"],
            "message" => $data["message"] ?? null,
            "result" => $data["result"] ?? null,
        ];

        if (isset($data["errors"])) {
            $response_structure["errors"] = $data["errors"];
        }

        if (isset($data["status"])) {
            $statusCode = $data["status"];
        }

        if (
            isset($data["exception"]) &&
            $data["exception"] instanceof Throwable
        ) {
            if (config("app.env") !== "production") {
                $response_structure["exception"] = [
                    "message" => $data["exception"]->getMessage(),
                    "file" => $data["exception"]->getFile(),
                    "line" => $data["exception"]->getLine(),
                    "code" => $data["exception"]->getCode(),
                    "trace" => $data["exception"]->getTrace(),
                ];
            }
        }

        if ($data["status"] === false) {
            if (isset($data["error_code"])) {
                $response_structure["error_code"] = $data["error_code"];
            } else {
                $response_structure["error_code"] = 1;
            }
        }

        return [
            "content" => $response_structure,
            "statusCode" => $statusCode,
            "headers" => $headers,
        ];
    }

    /**
     * Return generic json response with the given data.
     * @param array $data
     * @param int $statusCode
     * @param array $headers
     * @return JsonResponse
     */
    protected function apiResponse(
        array $data = [],
        int   $statusCode = 200,
        array $headers = []
    ): JsonResponse
    {
        $result = $this->parseGivenData($data, $statusCode, $headers);

        return response()->json(
            $result["content"],
            $result["statusCode"],
            $result["headers"]
        );
    }

    protected function respondWithResourceCollection(
        ResourceCollection $resourceCollection,
        string             $message,
        int                $statusCode = 200,
                           $headers = []
    ): JsonResponse
    {
        return $this->apiResponse(
            [
                "status" => true,
                "message" => $message,
                "result" => $resourceCollection->response()->getData(),
            ],
            $statusCode,
            $headers
        );
    }

    /**
     * @param string $message
     * @return JsonResponse
     */
    protected function respondSuccess($data = [], string $message = ''): JsonResponse
    {
        return $this->apiResponse(
            [
                'message' => $message,
                "status" => Response::HTTP_OK,
                "result" => $data,
            ],
            Response::HTTP_OK
        );
    }

    /**
     * Respond with created.
     *
     *
     * @return JsonResponse
     */
    protected function respondCreated($data = [], $message = ''): JsonResponse
    {
        return $this->apiResponse(
            [
                'message' => $message,
                "status" => Response::HTTP_CREATED,
                "result" => $data,
            ],
            201
        );
    }

    /**
     * Respond with no content.
     *
     * @param string $message
     *
     * @return JsonResponse
     */
    protected function respondNoContent(
        string $message = "No Content Found"
    ): JsonResponse
    {
        return $this->apiResponse(
            ["status" => false, "message" => $message],
            200
        );
    }

    /**
     * Respond with unauthorized.
     *
     * @param string $message
     *
     * @return JsonResponse
     */
    protected function respondUnAuthorized(
        string $message = "Unauthorized"
    ): JsonResponse
    {
        return $this->respondError($message, 401);
    }

    /**
     * Respond with error.
     *
     * @param string $message
     * @param int $statusCode
     *
     * @param Throwable|null $exception
     * @param int $error_code
     * @return JsonResponse
     */
    protected function respondError(
        string    $message,
        int       $statusCode = 400,
        int       $error_code = 1,
        Throwable $exception = null
    ): JsonResponse
    {
        return $this->apiResponse(
            [
                "status" => false,
                "message" => $message,
                "exception" => $exception,
                "error_code" => $error_code,
            ],
            $statusCode
        );
    }

    /**
     * Respond with forbidden.
     *
     * @param string $message
     *
     * @return JsonResponse
     */
    protected function respondForbidden(
        string $message = "Forbidden"
    ): JsonResponse
    {
        return $this->respondError($message, 403);
    }

    /**
     * Respond with not found.
     *
     * @param string $message
     *
     * @return JsonResponse
     */
    protected function respondNotFound(
        string $message = "Not Found"
    ): JsonResponse
    {
        return $this->respondError($message, 404);
    }

    /**
     * Respond with internal error.
     *
     * @param string $message
     *
     * @return ApiResponse
     */
    protected function respondInternalError(
        string $message = "Internal Error"
    ): ApiResponse
    {
        return $this->respondError($message, 500);
    }

    protected function respondValidationErrors(
        ValidationException $exception
    ): JsonResponse
    {
        return $this->apiResponse(
            [
                "status" => Response::HTTP_UNPROCESSABLE_ENTITY,
                "message" => $exception->getMessage(),
                "errors" => $exception->errors(),
            ],
            Response::HTTP_UNPROCESSABLE_ENTITY
        );
    }

    protected function respondWithSuccess(
        $data,
        string $message,
        int $statusCode = Response::HTTP_OK,
        array $headers = []
    ): JsonResponse
    {
        return $this->apiResponse(
            [
                "status" => Response::HTTP_OK,
                "message" => $message,
                "result" => [
                    "data" => $data,
                ],
            ],
            $statusCode,
            $headers
        );
    }
}
