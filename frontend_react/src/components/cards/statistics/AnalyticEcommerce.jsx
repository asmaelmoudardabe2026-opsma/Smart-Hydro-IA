import PropTypes from 'prop-types';

// material-ui
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';

// project imports
import MainCard from 'components/MainCard';

// icons
import RiseOutlined from '@ant-design/icons/RiseOutlined';
import FallOutlined from '@ant-design/icons/FallOutlined';

const iconSX = {
  fontSize: '0.75rem',
  color: 'inherit'
};

export default function AnalyticEcommerce({
  color = 'primary',
  title,
  count,
  percentage,
  isLoss,
  extra,
  labelText,
  icon
}) {
  return (
    <MainCard contentSX={{ p: 2.25 }}>

      <Stack sx={{ gap: 1 }}>

        {/* TITLE + ICON SAME LINE */}
        <Stack direction="row" spacing={1} alignItems="center">
          
          {icon && (
            <Avatar
              sx={{
                width: 26,
                height: 26,
                bgcolor: `${color}.main`,
                fontSize: '0.8rem'
              }}
            >
              {icon}
            </Avatar>
          )}

          <Typography variant="h6" sx={{ color: 'text.secondary' }}>
            {title}
          </Typography>

        </Stack>

        {/* VALUE + CHIP */}
        <Stack direction="row" sx={{ alignItems: 'center' }}>
          <Typography variant="h4" sx={{ color: 'inherit' }}>
            {count}
          </Typography>

          {percentage !== undefined && (
            <Chip
              variant="combined"
              color={color}
              icon={
                isLoss ? (
                  <FallOutlined style={iconSX} />
                ) : (
                  <RiseOutlined style={iconSX} />
                )
              }
              label={
                typeof percentage === 'string'
                  ? percentage
                  : `${percentage}%`
              }
              sx={{ ml: 1.25, pl: 1 }}
              size="small"
            />
          )}
        </Stack>

      </Stack>

      {/* EXTRA INFO */}
      {(labelText || extra) && (
        <Box sx={{ pt: 2.25 }}>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {labelText}{' '}
            <Typography
              component="span"
              variant="caption"
              sx={{ color: `${color}.main`, fontWeight: 600 }}
            >
              {extra}
            </Typography>
          </Typography>
        </Box>
      )}

    </MainCard>
  );
}

AnalyticEcommerce.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  percentage: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isLoss: PropTypes.bool,
  extra: PropTypes.string,
  labelText: PropTypes.string,
  icon: PropTypes.node
};