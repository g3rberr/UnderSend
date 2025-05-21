from django.utils import timezone

class ActiveUserMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.user.is_authenticated:
            if not self.hide_active:
                now = timezone.now()
                last_active = request.user.last_active

                if not last_active or (now - last_active).seconds > 60:
                    request.user.last_active = now
                    request.user.save(update_fields=['last_active'])
        return self.get_response(request)
